export interface CurrentUser {
	id: string;
	name: string;
	email: string;
	isAdmin: boolean;
	avatar: string | null;
}

export interface Category {
	id: string;
	name: string;
}

export interface Review {
	id: string;
	comment: string;
	rating: number;
	userId: string;
	productId: string;
	user: Partial<CurrentUser>;
}

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	categoryId: string;
	stock: number;
	rating: number;
	userId: string;
	user: Partial<CurrentUser>;
	category: Category;
	views: number;
	reviews: Review[];
}
