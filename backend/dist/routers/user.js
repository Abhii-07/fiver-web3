"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const client_1 = require("@prisma/client");
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
const middleware_1 = require("../middleware");
const s3_presigned_post_1 = require("@aws-sdk/s3-presigned-post");
const router = (0, express_1.Router)();
const prismaClient = new client_1.PrismaClient();
const s3Client = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: "AKIAXVW2DJKBVO5LLOVD",
        secretAccessKey: "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",
    },
    region: "ap-south-1",
});
router.get("/presignedUrl", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    const { url, fields } = yield (0, s3_presigned_post_1.createPresignedPost)(s3Client, {
        Bucket: 'decentralised-app',
        Key: `fiver/${userId}/${Math.random()}/image.jpg`,
        Conditions: [
            ['content-length-range', 0, 5 * 1024 * 1024] // 5 MB max
        ],
        Fields: {
            'Content-Type': 'image/png'
        },
        Expires: 3600
    });
    res.json({
        preSignedUrl: url,
        fields
    });
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hardCodedWalletAddress = "0xf2b7233405e7054C0486fcbB031a8af39D0a0825";
    const exsistingUser = yield prismaClient.user.findFirst({
        where: {
            address: hardCodedWalletAddress,
        },
    });
    if (exsistingUser) {
        const token = jsonwebtoken_1.default.sign({
            userId: exsistingUser.id,
        }, __1.JWT_SECRET);
        res.json({ token });
    }
    else {
        const user = yield prismaClient.user.create({
            data: {
                address: hardCodedWalletAddress,
            },
        });
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
        }, __1.JWT_SECRET);
        res.json({ token });
    }
}));
exports.default = router;
