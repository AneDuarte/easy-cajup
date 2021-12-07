module.exports = {
  dialect: "postgres",
  host: "",
  username: "postgres",
  password: "root",
  database: "some_database",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
};
