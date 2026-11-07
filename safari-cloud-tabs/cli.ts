import sqlite3 from "better-sqlite3";
import { fs, argv, $ } from "zx";

const db = sqlite3(
  "/Users/ryankubik/Library/Containers/com.apple.Safari/Data/Library/Safari/CloudTabs.db",
);

const [command, arg] = argv._;

switch (command) {
  case "tableinfo":
    dumpAllTables();
    break;
  case "tabs":
    listAllTabs();
    break;
  case "close":
    deleteTab(arg);
    break;
  case "record":
    await generateCloudKitRecord();
    break;
  default:
    console.log(`Commands:
      tableinfo
      tabs
      record --tab <id> --device <id> --url <url>
      close <id>`);
    break;
}

function dumpAllTables() {
  const tables = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table'")
    .all() as { name: string }[];

  for (const { name } of tables) {
    const columns = db.prepare(`PRAGMA table_info("${name}")`).all() as {
      name: string;
      type: string;
    }[];

    console.log(`\n${name}`);
    for (const column of columns) {
      console.log(`  ${column.name}: ${column.type}`);
    }
  }

  const requests = db
    .prepare("SELECT * FROM cloud_tab_close_requests")
    .all() as unknown[];

  console.log(requests.length);
  requests.forEach((request) => console.log(JSON.stringify(request)));
}

function listAllTabs() {
  const tabs = db.prepare("SELECT * FROM cloud_tabs").all() as {
    tab_uuid: string;
    device_uuid: string;
    title: string;
    url: string;
  }[];
  const deviceRows = db.prepare("SELECT * FROM cloud_tab_devices").all() as {
    device_uuid: string;
    device_name: string;
  }[];
  const devices: Record<string, string> = deviceRows.reduce(
    (record, { device_uuid, device_name }) => {
      return {
        ...record,
        [device_uuid]: device_name,
      };
    },
    {},
  );

  const lines = tabs.map((tab) => {
    return `- tabId: ${tab.tab_uuid}
  deviceId: ${tab.device_uuid}
  deviceName: ${devices[tab.device_uuid]}
  title: ${tab.title}
  url: ${tab.url}
`;
  });

  fs.writeFile(`tabs.yaml`, lines.join("\n"));
}

/**
 * This didn't actually do anything useful. It just deleted the local version
 * of this tab. But it was still open on my iPhone.
 */
function deleteTab(id: string) {
  db.prepare(`DELETE FROM cloud_tabs WHERE tab_uuid = '${id}'`).run();
}

async function generateCloudKitRecord() {
  const output =
    await $`swift generate-record.swift ${argv.tab} ${argv.device} ${argv.url}`;
  console.log(output.text());
}
