export interface CurrentUser {
	id: string;
	name: string;
	email: string;
	isAdmin: boolean;
	avatar: string | null;
	cartCount: number;
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

export interface CartItem {
	id: string;
	product: {
		id: string;
		name: string;
		price: number;
		image: string;
	};
	quantity: number;
	subTotal: number;
}
