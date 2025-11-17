package com.Proyecto.Joyeria_Marly.persistance.mapper;

import com.Proyecto.Joyeria_Marly.domain.dto.User;
import com.Proyecto.Joyeria_Marly.persistance.entity.Roles;
import com.Proyecto.Joyeria_Marly.persistance.entity.Usuarios;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-11-16T11:52:50-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Oracle Corporation)"
)
@Component
public class UsuarioMapperImpl implements UsuarioMapper {

    @Override
    public User toUser(Usuarios usuario) {
        if ( usuario == null ) {
            return null;
        }

        User user = new User();

        user.setUserId( usuario.getIdUsuario() );
        user.setName( usuario.getNombre() );
        user.setLastName( usuario.getApellido() );
        user.setDni( usuario.getDni() );
        user.setEmail( usuario.getEmail() );
        user.setPassword( usuario.getPassword() );
        user.setPhone( usuario.getTelefono() );
        user.setAddress( usuario.getDireccion() );
        user.setActive( usuario.getActivo() );
        user.setRoleId( usuarioRolIdRol( usuario ) );
        user.setRoleName( usuarioRolNombreRol( usuario ) );

        return user;
    }

    @Override
    public Usuarios toUsuario(User user) {
        if ( user == null ) {
            return null;
        }

        Usuarios usuarios = new Usuarios();

        usuarios.setIdUsuario( user.getUserId() );
        usuarios.setNombre( user.getName() );
        usuarios.setApellido( user.getLastName() );
        usuarios.setDni( user.getDni() );
        usuarios.setEmail( user.getEmail() );
        usuarios.setPassword( user.getPassword() );
        usuarios.setTelefono( user.getPhone() );
        usuarios.setDireccion( user.getAddress() );
        usuarios.setActivo( user.getActive() );

        return usuarios;
    }

    private Integer usuarioRolIdRol(Usuarios usuarios) {
        if ( usuarios == null ) {
            return null;
        }
        Roles rol = usuarios.getRol();
        if ( rol == null ) {
            return null;
        }
        Integer idRol = rol.getIdRol();
        if ( idRol == null ) {
            return null;
        }
        return idRol;
    }

    private String usuarioRolNombreRol(Usuarios usuarios) {
        if ( usuarios == null ) {
            return null;
        }
        Roles rol = usuarios.getRol();
        if ( rol == null ) {
            return null;
        }
        String nombreRol = rol.getNombreRol();
        if ( nombreRol == null ) {
            return null;
        }
        return nombreRol;
    }
}
