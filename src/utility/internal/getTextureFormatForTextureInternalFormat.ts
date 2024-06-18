import TextureFormat from "#TextureFormat";
import type { TextureInternalFormat } from "#TextureInternalFormat";
import TextureUncompressedSizedInternalFormat from "#TextureUncompressedSizedInternalFormat";
import TextureUncompressedUnsizedInternalFormat from "#TextureUncompressedUnsizedInternalFormat";
import TextureCompressedSizedInternalFormat from "#TextureCompressedSizedInternalFormat";
import TextureCompressedUnsizedInternalFormat from "#TextureCompressedUnsizedInternalFormat";

/**
 * Gets the corresponding texture format for an internal format.
 * @param internalFormat - The internal format.
 * @returns The texture format.
 * @see [`glTexImage2D`](https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml)
 * @internal
 */
export default function getTextureFormatForTextureInternalFormat(
	internalFormat: TextureInternalFormat
): TextureFormat {
	switch (internalFormat) {
		case TextureUncompressedUnsizedInternalFormat.RGB:
		case TextureUncompressedSizedInternalFormat.RGB8:
		case TextureUncompressedSizedInternalFormat.SRGB8:
		case TextureUncompressedSizedInternalFormat.RGB565:
		case TextureUncompressedSizedInternalFormat.RGB8_SNORM:
		case TextureUncompressedSizedInternalFormat.R11F_G11F_B10F:
		case TextureUncompressedSizedInternalFormat.RGB9_E5:
		case TextureUncompressedSizedInternalFormat.RGB16F:
		case TextureUncompressedSizedInternalFormat.RGB32F:
			return TextureFormat.RGB;
		case TextureUncompressedUnsizedInternalFormat.RGBA:
		case TextureUncompressedSizedInternalFormat.RGBA8:
		case TextureUncompressedSizedInternalFormat.SRGB8_ALPHA8:
		case TextureUncompressedSizedInternalFormat.RGBA8_SNORM:
		case TextureUncompressedSizedInternalFormat.RGB5_A1:
		case TextureUncompressedSizedInternalFormat.RGBA4:
		case TextureUncompressedSizedInternalFormat.RGB10_A2:
		case TextureUncompressedSizedInternalFormat.RGBA16F:
		case TextureUncompressedSizedInternalFormat.RGBA32F:
			return TextureFormat.RGBA;
		case TextureUncompressedUnsizedInternalFormat.LUMINANCE_ALPHA:
			return TextureFormat.LUMINANCE_ALPHA;
		case TextureUncompressedUnsizedInternalFormat.LUMINANCE:
			return TextureFormat.LUMINANCE;
		case TextureUncompressedUnsizedInternalFormat.ALPHA:
			return TextureFormat.ALPHA;
		case TextureUncompressedUnsizedInternalFormat.SRGB:
			return TextureFormat.SRGB;
		case TextureUncompressedUnsizedInternalFormat.SRGB_ALPHA:
			return TextureFormat.SRGB_ALPHA;
		case TextureUncompressedSizedInternalFormat.R8:
		case TextureUncompressedSizedInternalFormat.R8_SNORM:
		case TextureUncompressedSizedInternalFormat.R16F:
		case TextureUncompressedSizedInternalFormat.R32F:
			return TextureFormat.RED;
		case TextureUncompressedSizedInternalFormat.R8UI:
		case TextureUncompressedSizedInternalFormat.R8I:
		case TextureUncompressedSizedInternalFormat.R16UI:
		case TextureUncompressedSizedInternalFormat.R16I:
		case TextureUncompressedSizedInternalFormat.R32UI:
		case TextureUncompressedSizedInternalFormat.R32I:
			return TextureFormat.RED_INTEGER;
		case TextureUncompressedSizedInternalFormat.RG8:
		case TextureUncompressedSizedInternalFormat.RG8_SNORM:
		case TextureUncompressedSizedInternalFormat.RG16F:
		case TextureUncompressedSizedInternalFormat.RG32F:
			return TextureFormat.RG;
		case TextureUncompressedSizedInternalFormat.RG8UI:
		case TextureUncompressedSizedInternalFormat.RG8I:
		case TextureUncompressedSizedInternalFormat.RG16UI:
		case TextureUncompressedSizedInternalFormat.RG16I:
		case TextureUncompressedSizedInternalFormat.RG32UI:
		case TextureUncompressedSizedInternalFormat.RG32I:
			return TextureFormat.RG_INTEGER;
		case TextureUncompressedSizedInternalFormat.RGB8UI:
		case TextureUncompressedSizedInternalFormat.RGB8I:
		case TextureUncompressedSizedInternalFormat.RGB16UI:
		case TextureUncompressedSizedInternalFormat.RGB16I:
		case TextureUncompressedSizedInternalFormat.RGB32UI:
		case TextureUncompressedSizedInternalFormat.RGB32I:
			return TextureFormat.RGB_INTEGER;
		case TextureUncompressedSizedInternalFormat.RGBA8UI:
		case TextureUncompressedSizedInternalFormat.RGBA8I:
		case TextureUncompressedSizedInternalFormat.RGB10_A2UI:
		case TextureUncompressedSizedInternalFormat.RGBA16UI:
		case TextureUncompressedSizedInternalFormat.RGBA16I:
		case TextureUncompressedSizedInternalFormat.RGBA32UI:
		case TextureUncompressedSizedInternalFormat.RGBA32I:
			return TextureFormat.RGBA_INTEGER;
		case TextureUncompressedSizedInternalFormat.DEPTH_COMPONENT16:
		case TextureUncompressedSizedInternalFormat.DEPTH_COMPONENT24:
		case TextureUncompressedSizedInternalFormat.DEPTH_COMPONENT32F:
			return TextureFormat.DEPTH_COMPONENT;
		case TextureUncompressedSizedInternalFormat.DEPTH24_STENCIL8:
		case TextureUncompressedSizedInternalFormat.DEPTH32F_STENCIL8:
			return TextureFormat.DEPTH_STENCIL;
		case TextureCompressedSizedInternalFormat.COMPRESSED_R11_EAC:
			return TextureFormat.COMPRESSED_R11_EAC;
		case TextureCompressedSizedInternalFormat.COMPRESSED_SIGNED_R11_EAC:
			return TextureFormat.COMPRESSED_SIGNED_R11_EAC;
		case TextureCompressedSizedInternalFormat.COMPRESSED_RG11_EAC:
			return TextureFormat.COMPRESSED_RG11_EAC;
		case TextureCompressedSizedInternalFormat.COMPRESSED_SIGNED_RG11_EAC:
			return TextureFormat.COMPRESSED_SIGNED_RG11_EAC;
		case TextureCompressedSizedInternalFormat.COMPRESSED_RGB8_ETC2:
			return TextureFormat.COMPRESSED_RGB8_ETC2;
		case TextureCompressedSizedInternalFormat.COMPRESSED_RGBA8_ETC2_EAC:
			return TextureFormat.COMPRESSED_RGBA8_ETC2_EAC;
		case TextureCompressedSizedInternalFormat.COMPRESSED_SRGB8_ETC2:
			return TextureFormat.COMPRESSED_SRGB8_ETC2;
		case TextureCompressedSizedInternalFormat.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:
			return TextureFormat.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;
		case TextureCompressedSizedInternalFormat.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2:
			return TextureFormat.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2;
		case TextureCompressedSizedInternalFormat.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2:
			return TextureFormat.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGB_S3TC_DXT1_EXT:
			return TextureFormat.COMPRESSED_RGB_S3TC_DXT1_EXT;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_S3TC_DXT1_EXT:
			return TextureFormat.COMPRESSED_RGBA_S3TC_DXT1_EXT;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_S3TC_DXT3_EXT:
			return TextureFormat.COMPRESSED_RGBA_S3TC_DXT3_EXT;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_S3TC_DXT5_EXT:
			return TextureFormat.COMPRESSED_RGBA_S3TC_DXT5_EXT;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB_S3TC_DXT1_EXT:
			return TextureFormat.COMPRESSED_SRGB_S3TC_DXT1_EXT;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT:
			return TextureFormat.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT:
			return TextureFormat.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT:
			return TextureFormat.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGB_PVRTC_4BPPV1_IMG:
			return TextureFormat.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG:
			return TextureFormat.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGB_PVRTC_2BPPV1_IMG:
			return TextureFormat.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG:
			return TextureFormat.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_ASTC_4x4_KHR:
			return TextureFormat.COMPRESSED_RGBA_ASTC_4x4_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:
			return TextureFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_ASTC_5x4_KHR:
			return TextureFormat.COMPRESSED_RGBA_ASTC_5x4_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:
			return TextureFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_ASTC_5x5_KHR:
			return TextureFormat.COMPRESSED_RGBA_ASTC_5x5_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:
			return TextureFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_ASTC_6x5_KHR:
			return TextureFormat.COMPRESSED_RGBA_ASTC_6x5_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:
			return TextureFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_ASTC_6x6_KHR:
			return TextureFormat.COMPRESSED_RGBA_ASTC_6x6_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:
			return TextureFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_ASTC_8x5_KHR:
			return TextureFormat.COMPRESSED_RGBA_ASTC_8x5_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:
			return TextureFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_ASTC_8x6_KHR:
			return TextureFormat.COMPRESSED_RGBA_ASTC_8x6_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:
			return TextureFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_ASTC_8x8_KHR:
			return TextureFormat.COMPRESSED_RGBA_ASTC_8x8_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:
			return TextureFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_ASTC_10x5_KHR:
			return TextureFormat.COMPRESSED_RGBA_ASTC_10x5_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:
			return TextureFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_ASTC_10x6_KHR:
			return TextureFormat.COMPRESSED_RGBA_ASTC_10x6_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:
			return TextureFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_ASTC_10x8_KHR:
			return TextureFormat.COMPRESSED_RGBA_ASTC_10x8_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:
			return TextureFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_ASTC_10x10_KHR:
			return TextureFormat.COMPRESSED_RGBA_ASTC_10x10_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:
			return TextureFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_ASTC_12x10_KHR:
			return TextureFormat.COMPRESSED_RGBA_ASTC_12x10_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:
			return TextureFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_ASTC_12x12_KHR:
			return TextureFormat.COMPRESSED_RGBA_ASTC_12x12_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:
			return TextureFormat.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGBA_BPTC_UNORM_EXT:
			return TextureFormat.COMPRESSED_RGBA_BPTC_UNORM_EXT;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:
			return TextureFormat.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT:
			return TextureFormat.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT:
			return TextureFormat.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RED_RGTC1_EXT:
			return TextureFormat.COMPRESSED_RED_RGTC1_EXT;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SIGNED_RED_RGTC1_EXT:
			return TextureFormat.COMPRESSED_SIGNED_RED_RGTC1_EXT;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_RED_GREEN_RGTC2_EXT:
			return TextureFormat.COMPRESSED_RED_GREEN_RGTC2_EXT;
		case TextureCompressedUnsizedInternalFormat.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT:
			return TextureFormat.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
	}
}
