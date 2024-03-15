import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant, RestaurantDocument } from './restaurant.model';
import { Model } from 'mongoose';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
  ) {}

  async createRestaurant(data: any): Promise<RestaurantDocument> {
    const restaurant = await this.restaurantModel.create(data);
    return restaurant.save();
  }

  async getRestaurant(id: string): Promise<RestaurantDocument> {
    const restaurant = await this.restaurantModel.findOne({ _id: id });
    return restaurant;
  }

  async getListRestaurant(): Promise<RestaurantDocument[]> {
    const restaurants = await this.restaurantModel.find();
    return restaurants;
  }
}
