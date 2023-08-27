import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

import BaseEntity from './BaseEntity'

@ObjectType({
    description: '',
})
@Entity('employees')
export class Employees extends BaseEntity<Employees> {
    @Field({
        nullable: true,
    })
    @Column({ type: 'varchar' })
    BUSINESS_ID?: string


    @Field({
        nullable: false,
    })
    @PrimaryGeneratedColumn('uuid')
    EMPLOYEE_ID: string

    @Field({
        nullable: false,
    })
    @Column({ type: 'varchar', length: 200 })
    LAST_NAME: string


    @Field({
        nullable: false,
    })
    @Column({ type: 'varchar', length: 200 })
    FIRST_NAME: string


    @Field({
        nullable: true,
    })
    @Column({ type: 'datetime' })
    HIREDATE?: Date


    @Field({
        nullable: true,
    })
    @Column({ type: 'varchar', length: 200 })
    ADDRESS?: string

    @Field({
        nullable: true,
    })
    @Column({ type: 'varchar', length: 200 })
    CITY?: string

    @Field({
        nullable: true,
    })
    @Column({ type: 'varchar', length: 200 })
    PHONE_NUMBER?: string

    @Field({
        nullable: true,
    })
    @Column({ type: 'varchar', length: 200 })
    EMAIL?: string

    @Field({
        nullable: true,
    })
    @Column({ type: 'varchar', length: 200 })
    POSITION_ID?: string


    @Field({
        nullable: true,
    })
    @Column({ type: 'char', })
    ESTATUS?: string


    @Field({
        nullable: true,
    })
    @Column({ type: 'datetime', insert: false, update: true })
    UPDATED_DATE?: Date


    @Field({
        nullable: true,
    })
    @Column({ type: 'varchar' })
    WAITING_TIME?: number
}
