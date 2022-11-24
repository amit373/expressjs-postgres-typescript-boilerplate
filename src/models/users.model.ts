import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';

export class UserModel extends Model {
  static associate(models): void {
    console.log('🚀 ~ file: users.model.ts ~ line 6 ~ UserModel ~ associate ~ models', models);
  }

  public id: number;
  public email: string;
  public password: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

UserModel.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(50),
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'users',
    sequelize,
    underscored: true,
    paranoid: true,
    timestamps: true,
  },
);
