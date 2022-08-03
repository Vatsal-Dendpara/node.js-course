import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Owner } from 'src/owners/entities/owner.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
@Entity()
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type?: string;

  @Column()
  @Field((type) => Int, { nullable: true })
  ownerId: number;

  @ManyToOne(() => Owner, (owner) => owner.pets, { onDelete: 'CASCADE' })
  @Field((type) => Owner, { nullable: true })
  owner: Owner;
}
