import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string): Promise<string> {
    const salt: string = randomBytes(8).toString("hex");
    // console.log("salt:", salt);
    const buf: Buffer<ArrayBufferLike> = (await scryptAsync(password, salt, 64)) as Buffer;
    // console.log("buf:", buf);

    const hashedPassword: string = `${buf.toString("hex")}.${salt}`;
    // console.log("hashedPassword:", hashedPassword);
    return hashedPassword;
  }

  static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf: Buffer<ArrayBufferLike> = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}
