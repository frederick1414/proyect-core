import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import BaseEntity from './BaseEntity';

@ObjectType({
  description: 'Entidad para los roles',
})
@Entity('client')
export class Client extends BaseEntity<Client> {
  @Field({ 
    nullable: true,
    description: 'ID único del rol',
  })
  @PrimaryGeneratedColumn('uuid')
  CLIENT_ID: string;

  @Field({
    nullable: true,
    description: '.)',
  })
  @Column({ type: 'varchar', length: 20 })
  EMPLOYEE_ID: string;

  @Field({
    nullable: true,
  })
  @Column({ type: 'varchar' })
  BUSINESS_ID: string;

  @Field({
    nullable: true,
    description: 'Nombre del rol',
  })
  @Column({ type: 'varchar' })
  USERNAME: string;

  @Field({
    nullable: true,
    description: 'Notas o comentarios sobre el rol',
  })
  @Column({ type: 'varchar', nullable: true})
  PHONE: string;

  @Field({
    nullable: true,
    description: 'Estado del  (activo, inactivo, etc.)',
  })
  @Column({ type: 'char' })
  ESTATUS: string;

  @Field({
    nullable: true,
    description: 'Fecha de creación del ',
  })
  @Column({ type: 'datetime'})
  CREATED_DATE: Date;

  @Field({
    nullable: true,
    description: 'ID del usuario que creó el ',
  })
  @Column({ type: 'varchar' })
  CREATED_USER: string;

  @Field({
    nullable: true,
    description: 'Fecha de la última actualización' ,
  })
  @Column({ type: 'datetime', })
  UPDATED_DATE?: Date;

  @Field({
    nullable: true,
    description: 'ID del usuario que realizó la última actualización ',
  })
  @Column({ type: 'varchar' })
  UPDATED_USER: string;
}
