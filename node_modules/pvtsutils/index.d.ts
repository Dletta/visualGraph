
declare namespace pvtsutils {
    function assign(target: any, ...sources: any[]): any;
    function combine(...buf: ArrayBuffer[]): ArrayBuffer;
    function isEqual(bytes1: ArrayBuffer, bytes2: ArrayBuffer): boolean;

    type BufferEncoding = "utf8" | "binary" | "base64" | "base64url" | "hex" | string;
    class Convert {
        static ToString(buffer: BufferSource, enc?: BufferEncoding): string;
        static FromString(str: string, enc?: BufferEncoding): ArrayBuffer;
        static ToBase64(buffer: BufferSource): string;
        static FromBase64(base64Text: string): ArrayBuffer;
        static FromBase64Url(base64url: string): ArrayBuffer;
        static ToBase64Url(data: BufferSource): string;
        static FromUtf8String(text: string): ArrayBuffer;
        static ToUtf8String(buffer: BufferSource): string;
        static FromBinary(text: string): ArrayBuffer;
        static ToBinary(buffer: BufferSource): string;
        static ToHex(buffer: BufferSource): string;
        static FromHex(hexString: string): ArrayBuffer;
        protected static Base64Padding(base64: string): string;
    }
}

export = pvtsutils;
export as namespace TSTool;