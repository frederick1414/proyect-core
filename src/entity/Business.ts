import { Column, Entity, PrimaryColumn } from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'

import BaseEntity from './BaseEntity'

@ObjectType({
  description: '',
})
@Entity('business')
export class Business extends BaseEntity<Business> {
  @Field({
    nullable: true,
    description: '',
  })
  @PrimaryColumn({ type: 'varchar', length: 255 })
  BUSINESS_ID: string
 
  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 255 })
  BUSINESS_NAME: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 100 })
  ACRONYM: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 255 })
  ADDRESS: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 25 })
  PHONE_1: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 25 })
  PHONE_2: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 255 })
  EMAIL_1: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 255 })
  EMAIL_2: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 255 })
  GENERIC_FIELD_1: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 255 })
  GENERIC_FIELD_2: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 255 })
  SLOGAN: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 500 })
  LOGO: string

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
