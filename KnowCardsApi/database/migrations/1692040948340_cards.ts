import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "cards";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id")
      table.string("question")
      table.string("response")
      table.integer("difficulty")

      table.integer("deck_id").unsigned().references("decks.id").onDelete("CASCADE")

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
