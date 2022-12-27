/* eslint-disable no-console */
import csv from 'csvtojson';
import fs from 'fs';
import { DesignCard } from '.';

type CsvDataType = {
    ID: string;
    email: string;
    first_name: string;
    last_name: string;
    image: string;
    telegram: string;
    company: string;
    title: string;
    twitter: string;
    'Profile URL': string;
}

const basedPath = './src/server';
const nullDiff = (str?: string) => (!!str && str.toLowerCase() !== 'null' && str.toLowerCase() !== 'undefined' ? str : '');
csv()
  .fromFile(`${basedPath}/data/sample-data.csv`)
  .then((results: CsvDataType[]) => {
    const mappingData: (DesignCard & { image: string })[] = results.map((data) => ({
      id: parseInt(data.ID, 10),
      email: nullDiff(data.email),
      firstName: nullDiff(data.first_name),
      lastName: nullDiff(data.last_name),
      image: nullDiff(data.image),
      telegram: nullDiff(data.telegram),
      company: nullDiff(data.company),
      title: nullDiff(data.title),
      twitter: nullDiff(data.twitter),
      profile: nullDiff(data['Profile URL']),
    }));

    const storedInDb = { designs: mappingData };
    fs.writeFile(`${basedPath}/db.json`, JSON.stringify(storedInDb, undefined, 2), () => {
      console.log('Write successfully');
    });
  });
