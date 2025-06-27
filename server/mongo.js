#!/usr/bin/env node
import { Command } from 'commander';
import { MongoClient, ObjectId } from 'mongodb';

const program = new Command();
const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'tse';
const COLLECTION_NAME = 'socks';

async function connectDB() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);
  return { client, collection };
}

program
  .command('read')
  .description('Read socks')
  .action(async () => {
    const { client, collection } = await connectDB();
    const socks = await collection.find({}).limit(10).toArray();
    console.log('Socks:', socks);
    await client.close();
  });

  program
  .command('insert')
  .description('Insert a new sock with detailed structure')
  .requiredOption('--size <size>', 'Sock size')
  .requiredOption('--color <color>', 'Sock color')
  .requiredOption('--pattern <pattern>', 'Sock pattern')
  .requiredOption('--material <material>', 'Sock material')
  .requiredOption('--condition <condition>', 'Sock condition')
  .requiredOption('--forFoot <forFoot>', 'Left or Right')
  .requiredOption('--waterResistant <waterResistant>', 'true or false')
  .requiredOption('--padded <padded>', 'true or false')
  .requiredOption('--antiBacterial <antiBacterial>', 'true or false')
  .action(async (options) => {
    const { client, collection } = await connectDB();

    const sock = {
      sockDetails: {
        size: options.size,
        color: options.color,
        pattern: options.pattern,
        material: options.material,
        condition: options.condition,
        forFoot: options.forFoot
      },
      additionalFeatures: {
        waterResistant: options.waterResistant === 'true',
        padded: options.padded === 'true',
        antiBacterial: options.antiBacterial === 'true'
      },
      addedTimestamp: new Date()
    };

    const result = await collection.insertOne(sock);
    console.log(`Inserted sock with ID: ${result.insertedId}`);
    await client.close();
  });


program
  .command('update')
  .description('Update a sock\'s color by ID')
  .requiredOption('--id <id>', 'Sock ID')
  .requiredOption('--color <color>', 'New color')
  .action(async (options) => {
    const { client, collection } = await connectDB();
    const result = await collection.updateOne(
      { _id: new ObjectId(options.id) },
      { $set: { "sockDetails.color": options.color } }
    );
    console.log(`Updated ${result.modifiedCount} sock(s).`);
    await client.close();
  });

program
  .command('delete')
  .description('Delete a sock by ID')
  .requiredOption('--id <id>', 'Sock ID')
  .action(async (options) => {
    const { client, collection } = await connectDB();
    const result = await collection.deleteOne({ _id: new ObjectId(options.id) });
    console.log(`Deleted ${result.deletedCount} sock(s).`);
    await client.close();
  });

program.parse(process.argv);