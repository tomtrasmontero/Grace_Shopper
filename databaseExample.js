


module.exports = db;

const User = db.define('user', {
    type: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.INTEGER
    },
    phone: {
        type: Sequelize.STRING
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    avatar: {
        type: Sequelize.STRING
    }
});

//users M:1 order foreign key in order
const Order = db.define('order', {
    status: {
        type: Sequelize.STRING
    },
    orderDate: {
        type: Sequelize.DATEONLY
    },
    paidDate: {
        type: Sequelize.DATEONLY
    },
    total: {
        type: Sequelize.INTEGER
    }
});

// Order 1:M orderItems M:1 Instruments
const OrderItem = db.define('orderItem', {
    quantity: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.INTEGER
    },
    tax: {
        type: Sequelize.STRING
    }
});

//Address M:1 Users
const Address = db.define('address', {
    line1: {
        type: Sequelize.STRING
    },
    line2: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    zip: {
        type: Sequelize.INTEGER
    },
    type: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    }
});


const Instruments = db.define('instrument', {
	title: {
        type: Sequelize.STRING
    },
    brand: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT
    },
    family: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
});

const Review = db.define('review', {
	product: {
        type: Sequelize.STRING
    },
    rating: {
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.DATEONLY
    },
    title: {
        type: Sequelize.STRING
    }
});


module.exports = {
	models:{
		Users: Users,
		Order: Order,
		OrderItem: OrderItem,
		Address: Address,
		Review: Review,
		Instrument: Instrument
	}
}