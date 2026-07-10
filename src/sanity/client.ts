import { Category, Color, Company, Product, Offer } from '../types';
import {
  MOCK_CATEGORIES,
  MOCK_COLORS,
  MOCK_COMPANIES,
  MOCK_PRODUCTS,
  MOCK_OFFERS,
} from './mockData';
import { client, urlFor } from '../lib/sanityClient';

export { client, urlFor };

/**
 * FETCH GROQ DATA OR FAILOVER TO LOCAL HIGH-FIDELITY DATASETS
 */

export async function fetchCategories(): Promise<Category[]> {
  if (!client) {
    console.log('[Sanity] No Project ID configured. Falling back to mock categories.');
    return MOCK_CATEGORIES;
  }
  try {
    const query = `*[_type == "category"] {
      _id,
      categoryId,
      name,
      description,
      image
    }`;
    const data = await client.fetch<Category[]>(query);
    return data.length > 0 ? data : MOCK_CATEGORIES;
  } catch (error) {
    console.warn('[Sanity] Error fetching categories, falling back to mock data:', error);
    return MOCK_CATEGORIES;
  }
}

export async function fetchColors(): Promise<Color[]> {
  if (!client) {
    return MOCK_COLORS;
  }
  try {
    const query = `*[_type == "color"] {
      _id,
      name,
      colorCode
    }`;
    const data = await client.fetch<Color[]>(query);
    return data.length > 0 ? data : MOCK_COLORS;
  } catch (error) {
    console.warn('[Sanity] Error fetching colors, falling back to mock data:', error);
    return MOCK_COLORS;
  }
}

export async function fetchCompanies(): Promise<Company[]> {
  if (!client) {
    console.log('[Sanity] No Project ID configured. Falling back to mock companies.');
    return MOCK_COMPANIES;
  }
  try {
    const query = `*[_type == "company"] {
      _id,
      companyId,
      name,
      image,
      categoriesAvailable[]-> {
        _id,
        categoryId,
        name,
        description,
        image
      }
    }`;
    const data = await client.fetch<Company[]>(query);
    return data.length > 0 ? data : MOCK_COMPANIES;
  } catch (error) {
    console.warn('[Sanity] Error fetching companies, falling back to mock data:', error);
    return MOCK_COMPANIES;
  }
}

export async function fetchProducts(): Promise<Product[]> {
  if (!client) {
    console.log('[Sanity] No Project ID configured. Falling back to mock products.');
    return MOCK_PRODUCTS;
  }
  try {
    const query = `*[_type == "product"] {
      _id,
      productId,
      name,
      description,
      size,
      mrp,
      price,
      discount,
      image,
      company-> {
        _id,
        companyId,
        name,
        image
      },
      category-> {
        _id,
        categoryId,
        name,
        image
      },
      colors[]-> {
        _id,
        name,
        colorCode
      }
    }`;
    const data = await client.fetch<Product[]>(query);
    return data.length > 0 ? data : MOCK_PRODUCTS;
  } catch (error) {
    console.warn('[Sanity] Error fetching products, falling back to mock data:', error);
    return MOCK_PRODUCTS;
  }
}

export async function fetchOffers(): Promise<Offer[]> {
  if (!client) {
    console.log('[Sanity] No Project ID configured. Falling back to mock offers.');
    return MOCK_OFFERS;
  }
  try {
    const query = `*[_type == "offer"] {
      _id,
      offerId,
      title,
      description,
      discount,
      image,
      featured,
      company-> {
         _id,
         companyId,
         name
      }
    }`;
    const data = await client.fetch<Offer[]>(query);
    return data.length > 0 ? data : MOCK_OFFERS;
  } catch (error) {
    console.warn('[Sanity] Error fetching offers, falling back to mock data:', error);
    return MOCK_OFFERS;
  }
}
