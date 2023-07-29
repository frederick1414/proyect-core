import { Connection, createConnection } from "typeorm";
import colors from "colors";

/**
 * @description Create a database connection
 * */
export async function startMySqlDBConnection(): Promise<void> {
  try {
    const connection: Connection = await createConnection();

    if (connection.isConnected) {
      console.log(
        colors.blue(
          `💾 MySql-DB connection successfuly at: ${process.env.TYPEORM_DB_HOST}`
        )
      );
    }
  } catch (e) {
    console.log(colors.red(`--> DB connection failed. ${e}`));
  }
}
