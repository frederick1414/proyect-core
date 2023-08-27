import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'

import BaseEntity from './BaseEntity'

@ObjectType({
  description: '',
})
@Entity('service')
export class Service extends BaseEntity<Service> {
  @Field({
    nullable: true,
    description: '',
  })
  @PrimaryGeneratedColumn('uuid')
  service_id: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 100 })
  description: string


  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'char', length: 10 })
  BUSINESS_ID: string


  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'char', length: 1 })
  ESTATUS: string

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
  @Column({ type: 'datetime', insert: false, update: true })
  UPDATE_DATE: Date

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 10 })
  EMPLOYEE_ID: string

  @Field({
    nullable: true,
    description: 'MONTO DEL SERVICIO',
  })
  @Column({ type: 'varchar', length: 200 })
  AMOUNT?:string

}
