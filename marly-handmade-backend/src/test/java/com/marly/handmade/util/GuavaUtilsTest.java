package com.marly.handmade.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GuavaUtilsTest {

    @Test
    void requerirNoNulo_conValor_noLanza() {
        GuavaUtils.requireNonNullRuntime("value", "should not be null");
    }

    @Test
    void requerirNoNulo_conNull_lanzaRuntimeException() {
        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> GuavaUtils.requireNonNullRuntime(null, "is null"));
        assertEquals("is null", ex.getMessage());
    }

    @Test
    void verificarArgumento_cuandoTrue_noLanza() {
        GuavaUtils.checkArgumentRuntime(2 > 1, "bad");
    }

    @Test
    void verificarArgumento_cuandoFalse_lanzaRuntimeException() {
        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> GuavaUtils.checkArgumentRuntime(false, "not true"));
        assertEquals("not true", ex.getMessage());
    }
}
