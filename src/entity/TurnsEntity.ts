import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

import BaseEntity from './BaseEntity'

@ObjectType({
    description: 'Entity the turns',
})
@Entity('turns')
export class Turns extends BaseEntity<Turns> {
    @Field({
        nullable: true,
        description: '',
    })
    @PrimaryGeneratedColumn('uuid')
    TURN_ID?: string

    @Field({
        nullable: true,
        description: '',
    })
    @Column({ type: 'varchar', length: 255 })
    EMPLOYEE_ID?: string


    @Field({
        nullable: true,
        description: '',
    })
    @Column({ type: 'varchar', length: 255 })
    USER_ID?: string

    @Field({
        nullable: true,
        description: '',
    })
    @Column({ type: 'varchar', length: 255 })
    SERVICE_ID?: string

    @Field({
        nullable: true,
        description: '',
    })
    @Column({ type: 'char', length: 1 })
    ESTATUS?: string


    @Field({
        nullable: true,
        description: '',
    })
    @Column({ type: 'datetime', insert: true, update: false })
    TIME?: Date

    @Field({
        nullable: true,
        description: '',
    })
    @Column({ type: 'varchar', length: 100 })
    PHONE?: string

    @Field({
        nullable: true,
        description: '',
    })
    @Column({ type: 'datetime', insert: true, update: false })
    CREATE_DATE?: Date

    @Field({
        nullable: true,
        description: '',
    })
    @Column({ type: 'datetime',nullable:true })
    UPDATE_DATE?: Date


    @Field({
        nullable: true,
        description: '',
    })
    @Column({ type: 'varchar', nullable:false })
    BUSINESS_ID: string


    @Field({
        nullable: true,
        description: '',
    })
    @Column({ type: 'varchar' })
    UPDATED_USER?: string

    @Field({
        nullable: true,
        description: '',
    })
    @Column({ type: 'varchar' })
    CREATED_USER?: string


    @Field({
        nullable: true,
        description: '',
    })
    @Column({ type: 'varchar' })
    USERNAME?:string

}
