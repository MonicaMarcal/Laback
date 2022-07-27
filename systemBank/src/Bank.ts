import { Account } from "./Account";
import { JSONFileManager } from "./JSONFileManager";

export default class Bank{
  private fileManager: JSONFileManager
  private accounts: Account[] = []
}
