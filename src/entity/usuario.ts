import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'

import BaseEntity from './BaseEntity'

@ObjectType({
  description: '',
})
@Entity('usuarios')
export class Usuario extends BaseEntity<Usuario> {
  @Field({
    nullable: true,
    description: '',
  })
  @PrimaryGeneratedColumn('uuid')
  ID_USUARIO: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 30 })
  NOMBRE: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 30 })
  APELLIDO: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 15 })
  TELEFONO: string

  @Field({
    nullable: true,
    description: '',
  })
  @Column({ type: 'varchar', length: 20 })
  CORREO: string
}
