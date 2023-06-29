const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config/config');
const sequelize = new Sequelize(`postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`, {
    logging: false
});

/*-- auto-generated definition
create table categories
(
    id            serial
constraint categories_pk
primary key,
    name          varchar                                not null,
    url           varchar                                not null,
    page_count    integer                                not null,
    "createdAt"   timestamp with time zone default now() not null,
    "updatedAt"   timestamp with time zone default now() not null,
    cashback_coef double precision         default 0.3   not null
);

alter table categories
owner to postgres;

create unique index categories_id_uindex
on categories (id);

create unique index categories_url_postfix_uindex
on categories (url);*/

const Categories = sequelize.define('categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    page_count: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    cashback_coef: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0.3
    }
}, {});

module.exports = Categories;
