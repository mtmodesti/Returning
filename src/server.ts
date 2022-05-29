import app from "./app";
import { AppDataSource } from "./data-source";

(async () => {
  await AppDataSource.initialize().catch((err) =>
    console.log("Error during data source", err)
  );
  app.listen(process.env.PORT || 3000, () => console.log("Running app"));
})
();

