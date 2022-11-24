import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export class UserRoleModel extends Model {
  static associate(models): void {
    console.log('🚀 ~ file: userRole.model.ts ~ line 6 ~ UserRoleModel ~ associate ~ models', models);
  }

  public id: number;
  public userId: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

UserRoleModel.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    userId: {
      allowNull: false,
      type: DataTypes.BIGINT,
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
