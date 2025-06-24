/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { fetchProducts, setPage } from '../../../api/redux/shopSlice'
import { BreadCrumbs } from '../../../common/components/BreadCrumbs'
import { FollowUs } from '../../../common/components/FollowUs/FollowUs'
import { PeakyBlinders } from '../../../common/components/PeakyBlinders'
import { Subscribe } from '../../../common/components/Subscribe'
import { CustomDropdown } from '../../../common/ui/CustomDropdown'
import { ProductCard } from '../../../common/ui/ProductCard'
import { productColors } from '../../../constant/productColors'
import { priceRanges } from '../../../constant/productPrices'
import { ROUTER_PATHS } from '../../../routes/routePaths'

import { Paggination } from './Paggination'
import styles from './Shop.module.scss'

export const Shop = () => {
  const dispatch = useDispatch()

  const brands = ['Minimog', 'Retrolie', 'Brook', 'Learts', 'Vagabond', 'Abby']
  const collections = [
    'All products',
    'Best sellers',
    'New arrivals',
    'Accessories',
  ]
  const tags = [
    'Fashion',
    'Hats',
    'Sandal',
    'Belt',
    'Bags',
    'Snacker',
    'Denim',
    'Minimog',
    'Vagabond',
    'Sunglasses',
    'Beachwear',
  ]

  const sizes = [
    { id: 1, size: 'S' },
    { id: 2, size: 'M' },
    { id: 3, size: 'L' },
    { id: 4, size: 'XL' },
  ]

  const [selectedPriceRange, setSelectedPriceRange] = useState(null)
  const [selectedTag, setSelectedTag] = useState(null)

  const sizeOrder = ['S', 'M', 'L', 'XL']
  const [selectedSize, setSelectedSize] = useState(null)
  const [limit, setLimit] = useState(9)

  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedCollections, setSelectedCollections] = useState(null)

  const [gridChange, setGridChange] = useState(null)

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand === selectedBrand ? null : brand)
    dispatch(setPage(1))
  }

  const handleCollectionsSelect = (collection) => {
    setSelectedCollections(
      collection === selectedCollections ? null : collection,
    )
    dispatch(setPage(1))
  }

  const {
    items: products,
    status,
    currentPage,
    totalCount,
  } = useSelector((state) => state.products_shop)

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage,
        limit,
        selectedSize: selectedSize?.size,
        selectedColor,
        selectedBrand,
        selectedTag,
      }),
    )
  }, [
    dispatch,
    currentPage,
    selectedSize,
    selectedColor,
    selectedBrand,
    selectedTag,
    limit,
  ])

  const sortSizesInProducts = (products) => {
    return products.map((product) => {
      const sortedSizes = product.size
        .map((id) => sizes.find((s) => s.id === id)?.size)
        .filter(Boolean)
        .sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))

      return {
        ...product,
        size: sortedSizes,
      }
    })
  }

  const cleanProducts = sortSizesInProducts(products)

  const filteredProducts = cleanProducts
    .filter((product) => {
      const sizeMatch = selectedSize
        ? product.size.includes(selectedSize.size)
        : true
      return sizeMatch
    })
    .filter((product) => {
      const colorMatch = selectedColor
        ? product.colors.includes(selectedColor)
        : true
      return colorMatch
    })
    .filter((product) => {
      const priceMatch = selectedPriceRange
        ? Number(product.price.replace('$', '')) >= selectedPriceRange.min &&
          Number(product.price.replace('$', '')) <= selectedPriceRange.max
        : true
      return priceMatch
    })
    .filter((product) => {
      const brandMatch = selectedBrand ? product.brand === selectedBrand : true
      return brandMatch
    })
    .filter((product) => {
      const tagMatch = selectedTag ? product.tags?.includes(selectedTag) : true
      return tagMatch
    })

  const toggleTagSelection = (tag) => {
    setSelectedTag((prev) => (prev === tag ? null : tag))
    dispatch(setPage(1))
  }

  const startIndex = (currentPage - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  return (
    <>
      <section className={styles.shop_sect}>
        <h1 className={styles.shop_title}>Fashion</h1>
        <BreadCrumbs
          crumbs={[
            { name: 'Главная', path: '/' },
            { name: 'Магазин', path: '/shop' },
          ]}
        />
        <div className={styles.shop_container}>
          <div className={styles.filters}>
            <h2 className={styles.filter_txt}>Filters</h2>
            <h3 className={styles.filters_size_title}>Size</h3>
            <div className={styles.filters_size}>
              {sizes.map((sizeObj) => (
                <button
                  key={sizeObj.id}
                  className={`${styles.sizeButton} ${
                    selectedSize?.id === sizeObj.id ? styles.active : ''
                  }`}
                  onClick={() => {
                    setSelectedSize(
                      selectedSize?.id === sizeObj.id ? null : sizeObj,
                    )
                    dispatch(setPage(1))
                  }}
                >
                  {sizeObj.size}
                </button>
              ))}
            </div>
            <div className={styles.filters_color}>
              <h3>Colors</h3>
              <div className={styles.colors}>
                {productColors.map((item, index) => (
                  <button
                    className={`${styles.circle} ${selectedColor === item.id ? styles.activeColor : ''}`}
                    style={{ background: item.color }}
                    key={index}
                    onClick={() => {
                      setSelectedColor(
                        (prev) => (prev === item.id ? null : item.id), // Сравниваем по id
                      )
                      dispatch(setPage(1))
                    }}
                  ></button>
                ))}
              </div>
            </div>
            <div className={styles.filters_price}>
              <h3>Prices</h3>
              <div className={styles.filters_price}>
                {priceRanges.map((range) => (
                  <button
                    key={range.id}
                    className={`${styles.priceButton} ${
                      selectedPriceRange?.id === range.id ? styles.active : ''
                    }`}
                    onClick={() => {
                      setSelectedPriceRange(
                        selectedPriceRange?.id === range.id ? null : range,
                      )
                      dispatch(setPage(1))
                    }}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.filters_brands}>
              <CustomDropdown
                label="Brands"
                options={brands}
                selectedOption={selectedBrand}
                onSelect={handleBrandSelect}
                marginBottom={'80px'}
              />
            </div>
            <div className={styles.filters_collections}>
              <CustomDropdown
                label="Collections"
                options={collections}
                selectedOption={selectedCollections}
                onSelect={handleCollectionsSelect}
              />
            </div>
            <div className={styles.filters_tags}>
              <h3>Tags</h3>
              <div className={styles.tags}>
                {tags.map((item, index) => (
                  <span
                    key={index}
                    className={`${styles.tag} ${selectedTag === item ? styles.activeTag : ''}`}
                    onClick={() => toggleTagSelection(item)}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.products}>
            <div className={styles.grid}>
              {status === 'loading' ? (
                <p>Загружаем товары...</p>
              ) : paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => {
                  localStorage.setItem(
                    `product_${product.id}`,
                    JSON.stringify(product),
                  )

                  return (
                    <NavLink
                      to={`${ROUTER_PATHS.productPage}/${product.id}`}
                      key={product.id}
                      style={{ textDecoration: 'none', color: '#000' }}
                      onClick={() => {
                        localStorage.setItem(
                          `product_${product.id}`,
                          JSON.stringify(product),
                        )
                      }}
                    >
                      <ProductCard
                        key={product.id}
                        name={product.name}
                        colors={product.colors}
                        image={product.image}
                        price={product.price}
                        sizes={product.size}
                      />
                    </NavLink>
                  )
                })
              ) : (
                <p>
                  {selectedSize && selectedColor
                    ? 'Нет товаров с таким размером и цветом'
                    : selectedSize
                      ? 'Нет товаров с таким размером'
                      : selectedColor
                        ? 'Нет товаров с таким цветом'
                        : 'Товары не найдены'}
                </p>
              )}
            </div>
            <Paggination
              currentPage={currentPage}
              totalCount={totalCount}
              changePage={(page) => dispatch(setPage(page))}
              limit={limit}
            />
          </div>
        </div>
      </section>
      <PeakyBlinders />
      <FollowUs />
      <Subscribe />
    </>
  )
}
