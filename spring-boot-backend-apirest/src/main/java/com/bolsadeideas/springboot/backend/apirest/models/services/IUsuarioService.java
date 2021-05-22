package com.bolsadeideas.springboot.backend.apirest.models.services;

import com.bolsadeideas.springboot.backend.apirest.models.entity.Usuario;

public interface IUsuarioService {
    Usuario findByUsername(String username);
}
