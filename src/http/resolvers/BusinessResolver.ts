import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Repository, getRepository } from 'typeorm'
import { HTTP_STATUS_BAD_REQUEST } from '../../config/statusCode'
import { SessionData, Upload } from '../../constants/generalTypes'
import { Business } from '../../entity/Business'
import { ApiGraphqlError, AuthorizationError } from '../../helpers/apiFunc'
import {
  defaultInsert,
  defaultQuery,
  defaultUpdate,
} from '../../helpers/crudFunc'
import {
  BusinessCreateInput,
  BusinessQueryInput,
  BusinessUpdateInput,
} from '../types/BusinessType'
import { GraphQLUpload } from 'graphql-upload'
import { INACTIVE_GLOBAL, MAIN_FILE_PATH } from '../../config/constants'

/**
 * It returns a Repository of Businesses.
 */
export const getBusinessRepository = (): Repository<Business> =>
  getRepository(Business)

@Resolver(Business)
export class BusinessResolver {
  @Query(() => [Business], {
    description: 'get business information',
  })
  async GetBusiness(
    @Arg('businessArg', () => BusinessQueryInput, {
      description: 'query business arguments.',
      nullable: true,
    })
    businessArg: BusinessQueryInput,
    @Ctx('user') user: SessionData
  ): Promise<Business[] | Error> {
    try {
      // if (!user) return AuthorizationError

      const data = await defaultQuery(
        user,
        getBusinessRepository(),
        businessArg,
        this.GetBusiness.name
      )

      if (data instanceof Error) throw Error(data.message)

      return data
    } catch (e) {
      return new ApiGraphqlError(
        HTTP_STATUS_BAD_REQUEST,
        'Error when consulting business information.',
        e?.message
      )
    }
  }

  @Mutation(() => Business, {
    description: 'register new business',
  })
  async CreateBusiness(
    @Arg('newBusiness', () => BusinessCreateInput, {
      description: 'create business arguments',
    })
    newBusiness: BusinessCreateInput,
    @Arg('file', () => GraphQLUpload, {
      nullable: true,
    })
    file: Upload,
    @Ctx('user') user: SessionData
  ): Promise<Business | Error> {
    try {
      if (!user) return AuthorizationError

      let pathFile = ''

      const business = await defaultInsert(
        user,
        getBusinessRepository(),
        {
          ...newBusiness,
          LOGO: pathFile,
        },
        this.CreateBusiness.name
      )

      if (business instanceof Error) throw Error(business.message)

      return business
    } catch (e) {
      return new ApiGraphqlError(
        HTTP_STATUS_BAD_REQUEST,
        'Error creating business.',
        e?.message
      )
    }
  }

  @Mutation(() => Business, {
    description: 'update business',
  })
  async UpdateBusiness(
    @Arg('updateBusiness', () => BusinessUpdateInput, {
      description: 'update business arguments',
    })
    updateBusiness: BusinessUpdateInput,
    @Ctx('user') user: SessionData
  ): Promise<Business | Error> {
    try {
      if (!user) return AuthorizationError

      const { BUSINESS_ID } = updateBusiness

      const businessExist = await getBusinessRepository().findOne({
        where: {
          BUSINESS_ID,
        },
      })

      if (!businessExist) {
        throw Error("the business you are trying to update doesn't exist.")
      }

      const business = await defaultUpdate(
        user,
        getBusinessRepository(),
        {
          ...updateBusiness,
        },
        {
          BUSINESS_ID,
        },
        this.UpdateBusiness.name
      )

      if (business instanceof Error) throw Error(business.message)

      return business
    } catch (e) {
      return new ApiGraphqlError(
        HTTP_STATUS_BAD_REQUEST,
        'Error updating business.',
        e?.message
      )
    }
  }

  @Mutation(() => String, { description: 'remove business.' })
  async DeleteBusiness(
    @Arg('businessId', () => String) businessId: string,
    @Ctx('user') user: SessionData
  ): Promise<string | Error> {
    try {
      if (!user) return AuthorizationError

      const businessExist = await getBusinessRepository().findOne({
        where: {
          BUSINESS_ID: businessId,
        },
      })

      if (!businessExist) {
        throw new Error("the business you are trying to delete doesn't exist.")
      }

      const business = await defaultUpdate(
        user,
        getBusinessRepository(),
        {
          STATUS: INACTIVE_GLOBAL,
        },
        {
          BUSINESS_ID: businessId,
        },
        this.DeleteBusiness.name
      )

      if (business instanceof Error) throw Error(business.message)

      return 'Business successfully removed'
    } catch (e) {
      return new ApiGraphqlError(
        HTTP_STATUS_BAD_REQUEST,
        'Error removing business.',
        e?.message
      )
    }
  }
}
