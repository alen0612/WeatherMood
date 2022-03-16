module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Posts;
};
