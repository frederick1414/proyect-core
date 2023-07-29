import { Field, Int, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import BaseEntity from './BaseEntity'

@ObjectType({
  description: '',
})
@Entity('user')
export class User extends BaseEntity<User> {
  @Field({
    nullable: true,
    description: '',
  })
  @PrimaryGeneratedColumn('uuid')
  USER_ID: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 255 })
  ROL_ID: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 255 })
  BUSINESS_ID: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 255 })
  EMPLOYEE_ID: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 100 })
  USERNAME: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 100 })
  EMAIL: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 100 })
  PASSWORD: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'char', length: 1 })
  STATUS: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 100 })
  IMAGE: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'datetime', insert: true, update: false })
  CREATED_DATE: Date

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 100 })
  CREATED_USER: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'datetime', insert: false, update: true })
  UPDATED_DATE: Date

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 100 })
  UPDATED_USER: string
}
