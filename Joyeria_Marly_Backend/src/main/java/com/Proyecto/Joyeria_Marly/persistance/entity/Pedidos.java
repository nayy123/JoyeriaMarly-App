package com.Proyecto.Joyeria_Marly.persistance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "pedido")
public class Pedidos {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private Integer idPedido;
    
    @Column(name = "fecha_pedido")
    private LocalDateTime fechaPedido = LocalDateTime.now();
    
    @NotNull
    @DecimalMin(value = "0.0", inclusive = true)
    @Column(name = "monto_total", nullable = false, precision = 10, scale = 2)
    private BigDecimal montoTotal;
    
    // Constructores
    public Pedidos() {
    }
    
    public Pedidos(BigDecimal montoTotal, Usuarios usuarioCliente, EstadoPedidos estado) {
        this.montoTotal = montoTotal;
        this.usuarioCliente = usuarioCliente;
        this.estado = estado;
    }
    
    // Getters y Setters
    public Integer getIdPedido() {
        return idPedido;
    }
    public void setIdPedido(Integer idPedido) {
        this.idPedido = idPedido;
    }
    
    public LocalDateTime getFechaPedido() {
        return fechaPedido;
    }
    public void setFechaPedido(LocalDateTime fechaPedido) {
        this.fechaPedido = fechaPedido;
    }
    
    public BigDecimal getMontoTotal() {
        return montoTotal;
    }
    public void setMontoTotal(BigDecimal montoTotal) {
        this.montoTotal = montoTotal;
    }
    
    public Usuarios getUsuarioCliente() {
        return usuarioCliente;
    }
    public void setUsuarioCliente(Usuarios usuarioCliente) {
        this.usuarioCliente = usuarioCliente;
    }
    
    public EstadoPedidos getEstado() {
        return estado;
    }
    public void setEstado(EstadoPedidos estado) {
        this.estado = estado;
    }
    
    // Relaciones
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_cliente", nullable = false)
    private Usuarios usuarioCliente;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_estado", nullable = false)
    private EstadoPedidos estado;
    
    // toString
    @Override
    public String toString() {
        return "Pedido{" +
                "idPedido=" + idPedido +
                ", fechaPedido=" + fechaPedido +
                ", montoTotal=" + montoTotal +
                '}';
    }
}
