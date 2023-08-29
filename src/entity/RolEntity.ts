import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import BaseEntity from './BaseEntity';

@ObjectType({
  description: 'Entidad para los roles',
})
@Entity('rol')
export class Rol extends BaseEntity<Rol> {
  @Field({ 
    nullable: true,
    description: 'ID único del rol',
  })
  @PrimaryGeneratedColumn('uuid')
  ROL_ID: string;

  @Field({
    nullable: true,
  })
  @Column({ type: 'uuid' })
  BUSINESS_ID: string;

  @Field({
    nullable: true,
    description: 'Nombre del rol',
  })
  @Column({ type: 'varchar', length: 50 })
  NAME: string;

  @Field({
    nullable: true,
    description: 'Notas o comentarios sobre el rol',
  })
  @Column({ type: 'varchar', nullable: true})
  NOTES: string;

  @Field({
    nullable: true,
    description: 'Estado del rol (activo, inactivo, etc.)',
  })
  @Column({ type: 'varchar', length: 20 })
  ESTATUS: string;

  @Field({
    nullable: true,
    description: 'Fecha de creación del rol',
  })
  @Column({ type: 'datetime'})
  CREATED_DATE: Date;

  @Field({
    nullable: true,
    description: 'ID del usuario que creó el rol',
  })
  @Column({ type: 'varchar' })
  CREATED_USER: string;

  @Field({
    nullable: true,
    description: 'Fecha de la última actualización del rol',
  })
  @Column({ type: 'datetime', })
  UPDATED_DATE: Date;

  @Field({
    nullable: true,
    description: 'ID del usuario que realizó la última actualización del rol',
  })
  @Column({ type: 'varchar' })
  UPDATED_USER: string;
}
