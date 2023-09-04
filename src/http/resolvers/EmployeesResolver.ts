import { Resolver, Query, Arg, Ctx, Mutation } from "type-graphql"
import { Code, Repository, getRepository } from "typeorm"
import { ERR_LOG_MUTATION, ERR_LOG_QUERY } from "../../config/generalErrors"
import { HTTP_STATUS_BAD_REQUEST } from "../../config/statusCode"
import { SessionData } from "../../constants/generalTypes"
import { AuthorizationError, ApiGraphqlError } from "../../helpers/apiFunc"
import { isAuth } from "../../helpers/authFunc"
import { Employees } from "../../entity/EmployeeEntity"
import { QueryEmployeesInput, UpdateEmployeesInput } from "../types/EmployeeType"

/**
 * It returns a repository for the User entity
 */
export const getEmployeesRepo = (): Repository<Employees> => getRepository(Employees)

@Resolver(Employees)
export class EmployeesResolver {


    @Query(() => [Employees], {
        description: 'Consultar Empleadoa',
    })
    async GetEmployee(
        @Arg('condition', () => QueryEmployeesInput, {
            description: 'query employees argument.',
            nullable: true,
        })
        condition: QueryEmployeesInput,
        @Ctx('user') user: SessionData
    ): Promise<Employees[] | Error> {
        try {
            if (!isAuth(user)) return AuthorizationError

            const response = await getEmployeesRepo().find(condition)

            return response
        } catch (e) {
            console.log(`${ERR_LOG_QUERY} GetEmployee: ${e}`)
            return new ApiGraphqlError(
                HTTP_STATUS_BAD_REQUEST,
                'Error when consulting user information.',
                e?.message
            )
        }
    }




    @Mutation(() => Employees, { description: 'Update Employees' })
    async UpdateEmployee(
        @Arg('condition', () => UpdateEmployeesInput, {
            description: 'Employees args',
        })
        condition: UpdateEmployeesInput,
        @Ctx('user') user: SessionData
    ): Promise<Employees | Error> {
        try {
            if (!isAuth(user)) return AuthorizationError

            const { businessId: BUSINESS_ID } = user
            const { EMPLOYEE_ID } = condition


            const employeeData:any = {
                ...condition,
                BUSINESS_ID,
                UPDATED_USER: user.username,
                UPDATED_DATE: new Date(),
            }

            await getEmployeesRepo().update(
                {
                    EMPLOYEE_ID,
                },
                employeeData
            )
            

            return employeeData
        } catch (e) {
            console.log(`${ERR_LOG_MUTATION} UpdateEmployee: ${e}`)

            return new ApiGraphqlError(
                HTTP_STATUS_BAD_REQUEST,
                'Failed to update user.',
                e?.message
            )
        }
    }





}