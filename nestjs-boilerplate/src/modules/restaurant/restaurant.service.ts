import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant, RestaurantDocument } from './restaurant.model';
import { Model } from 'mongoose';
import { IPaginateParams, IResponseList } from '@/share/common/app.interface';

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

  async getListRestaurant(params: IPaginateParams): Promise<IResponseList<RestaurantDocument>> {
    const page = params.page && params.page > 0 ? Number(params.page) : 1;
    const pageSize = params.pageSize && params.pageSize > 0 ? Number(params.pageSize) : 10;
    const conditions: any = {};
    if (params.search) {
      // can search by name || address || phone('i' is for case-insensitive search)
      conditions.$or = [
        { name: { $regex: new RegExp(params.search, 'i') } },
        { address: { $regex: new RegExp(params.search, 'i') } },
        { phone: { $regex: new RegExp(params.search, 'i') } },
      ];
    }
    const results = await this.restaurantModel.aggregate([
      {
        $facet: {
          // $match: filter documents by conditions -> $skip: filter documents by page -> $limit: limit the number of documents by pageSize
          documents: [{ $match: conditions }, { $skip: (page - 1) * pageSize }, { $limit: pageSize }],
          // total count of documents after filtering
          totalCount: [{ $count: 'count' }],
        },
      },
    ]);

    const data = results[0].documents;
    const total = results[0].totalCount.length > 0 ? results[0].totalCount[0].count : 0;
    const totalPage = total % pageSize === 0 ? total / pageSize : Math.floor(total / pageSize) + 1;
    return {
      data,
      total,
      totalPage,
      page,
      pageSize,
    };
  }

  async updateRestaurant(id: string, data: any): Promise<RestaurantDocument> {
    const restaurant = await this.restaurantModel.findOneAndUpdate({ _id: id }, data, { new: true });
    return restaurant;
  }

  async deleteRestaurant(id: string): Promise<RestaurantDocument> {
    const restaurant = await this.restaurantModel.findOneAndDelete({ _id: id });
    return restaurant;
  }
}
