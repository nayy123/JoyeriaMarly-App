package com.Proyecto.Joyeria_Marly.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Proyecto.Joyeria_Marly.domain.dto.Cart;
import com.Proyecto.Joyeria_Marly.domain.dto.CartItem;
import com.Proyecto.Joyeria_Marly.domain.dto.Product;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Optional;

@Service
public class CartService {
    
    @Autowired
    private ProductService productService;
    
    // Simulación de carritos en memoria (en producción usar Redis o base de datos)
    private final ConcurrentHashMap<Integer, Cart> userCarts = new ConcurrentHashMap<>();
    
    /**
     * Obtiene el carrito de un usuario
     * @param userId ID del usuario
     * @return Carrito del usuario
     */
    public Cart getCart(Integer userId) {
        return userCarts.computeIfAbsent(userId, id -> new Cart(userId));
    }
    
    /**
     * Agrega un producto al carrito
     * @param userId ID del usuario
     * @param productId ID del producto
     * @param quantity Cantidad a agregar
     * @return Carrito actualizado
     * @throws IllegalArgumentException si el producto no existe o no hay stock
     */
    public Cart addToCart(Integer userId, Integer productId, Integer quantity) {
        // Validar que el producto exista
        Product product = productService.getProductDetail(productId);
        
        // Validar que haya stock suficiente
        if (!productService.hasStock(productId, quantity)) {
            throw new IllegalArgumentException("Stock insuficiente");
        }
        
        Cart cart = getCart(userId);
        
        // Buscar si el producto ya está en el carrito
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();
        
        if (existingItem.isPresent()) {
            // Si ya existe, aumentar la cantidad
            CartItem item = existingItem.get();
            int newQuantity = item.getQuantity() + quantity;
            
            // Validar stock para la nueva cantidad
            if (!productService.hasStock(productId, newQuantity)) {
                throw new IllegalArgumentException("Stock insuficiente para la cantidad solicitada");
            }
            
            item.setQuantity(newQuantity);
        } else {
            // Si no existe, crear nuevo item
            CartItem newItem = new CartItem();
            newItem.setProductId(productId);
            newItem.setProductName(product.getName());
            newItem.setPrice(product.getPrice());
            newItem.setQuantity(quantity);
            newItem.setImageUrl(product.getImageUrl());
            
            cart.addItem(newItem);
        }
        
        return cart;
    }
    
    /**
     * Actualiza la cantidad de un producto en el carrito
     * @param userId ID del usuario
     * @param productId ID del producto
     * @param quantity Nueva cantidad
     * @return Carrito actualizado
     * @throws IllegalArgumentException si no hay stock suficiente
     */
    public Cart updateCartItem(Integer userId, Integer productId, Integer quantity) {
        Cart cart = getCart(userId);
        
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado en el carrito"));
        
        // Si la cantidad es 0 o negativa, remover el item
        if (quantity <= 0) {
            return removeFromCart(userId, productId);
        }
        
        // Validar stock
        if (!productService.hasStock(productId, quantity)) {
            throw new IllegalArgumentException("Stock insuficiente");
        }
        
        item.setQuantity(quantity);
        
        return cart;
    }
    
    /**
     * Remueve un producto del carrito
     * @param userId ID del usuario
     * @param productId ID del producto a remover
     * @return Carrito actualizado
     */
    public Cart removeFromCart(Integer userId, Integer productId) {
        Cart cart = getCart(userId);
        cart.removeItem(productId);
        return cart;
    }
    
    /**
     * Vacía el carrito de un usuario
     * @param userId ID del usuario
     * @return Carrito vacío
     */
    public Cart clearCart(Integer userId) {
        Cart cart = getCart(userId);
        cart.clear();
        return cart;
    }
    
    /**
     * Obtiene la cantidad de items en el carrito
     * @param userId ID del usuario
     * @return Cantidad total de items
     */
    public int getCartItemCount(Integer userId) {
        Cart cart = getCart(userId);
        return cart.getTotalItems();
    }
}
