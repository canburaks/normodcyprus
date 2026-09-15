import { validateContent } from "../src/lib/content/validate";
validateContent()
  .then((summary) => console.info("Content validated:", summary))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
