import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Restaurant {
  @Prop({ length: 100, nullable: true })
  name: string;

  @Prop({ length: 200, nullable: true })
  address: string;

  @Prop({ length: 20, nullable: true })
  phone: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
