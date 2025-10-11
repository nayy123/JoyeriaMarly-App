package com.marly.handmade.domain.cliente.data.request;

import jakarta.validation.constraints.NotNull;

public record ResetPasswordRequest(
        @NotNull
        String token,
        @NotNull
        String newPassword
) {
}
