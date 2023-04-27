import faker from 'faker'
import fs from 'fs'

// Set locale to use Vietnamese
faker.locale = 'vi'

// Random data
// console.log(faker.commerce.department());
// console.log(faker.commerce.productName());
// console.log(faker.commerce.productDescription());

// console.log(faker.random.uuid());
// console.log(faker.image.imageUrl());
// console.log(faker.name.findName());

const randomCategoryList = (n) => {
    if (n <= 0) return []
    const categoryList = []
    // loop and push category
    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.random.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }
        categoryList.push(category)
    })
    return categoryList
}

const randomProductList = (categoryList, numberOfProducts) => {
    if (numberOfProducts <= 0) return []
    const productList = []
    // random data
    for (const category of categoryList) {
        Array.from(new Array(numberOfProducts)).forEach(() => {
            const product = {
                categoryId: category.id,
                id: faker.random.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: faker.commerce.price(),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumbnailUrl: `https://picsum.photos/1000`,
            }
            productList.push(product)
        })
    }

    return productList
}

// IIFE
(() => {
    //random data
    const categoryList = randomCategoryList(4)
    const productList = randomProductList(categoryList, 5)
    //prepare db object
    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            name: 'Po'
        }
    }
    // write db obj to db.json file
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('Gernerate data successfully');
    })
})()