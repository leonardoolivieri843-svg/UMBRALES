# Deploy de UMBRALES en Vercel
## URL pública para impulsoTECH24

---

## Paso 1 — Subir el proyecto a GitHub

Necesitás una cuenta en GitHub (github.com). Es gratis.

Una vez que tenés cuenta, creá un repositorio nuevo:
1. Ir a github.com → botón verde "New"
2. Nombre del repositorio: `umbrales`
3. Dejarlo en "Public"
4. Clic en "Create repository"

Después, en tu terminal dentro de la carpeta UMBRALES:

```bash
git init
git add .
git commit -m "UMBRALES v1.0 — primer lanzamiento"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/umbrales.git
git push -u origin main
```

*(Reemplazá TU_USUARIO con tu nombre de usuario de GitHub)*

---

## Paso 2 — Deploy en Vercel

1. Ir a **vercel.com** y crear cuenta gratis (podés entrar con tu cuenta de GitHub)
2. Clic en "Add New Project"
3. Importar el repositorio `umbrales` desde GitHub
4. Vercel lo detecta como proyecto Vite automáticamente
5. Clic en **Deploy**

En 2-3 minutos tenés una URL como:
```
https://umbrales.vercel.app
```

---

## Paso 3 — Dominio personalizado (opcional)

Si querés `umbrales.impulsotech24.com` en vez de la URL de Vercel:
1. Comprás el dominio en cualquier registrador (Namecheap, GoDaddy, etc.)
2. En Vercel → Settings → Domains → agregar el dominio
3. Seguís las instrucciones de DNS

---

## Paso 4 — Actualizar el link en UMBRALES

Una vez que tenés la URL, hay que agregarla en el Header del proyecto.
Abrí `src/components/Header.tsx` y agregamos un botón "Abrir app" que linkee a la URL.

---

## Cada vez que hagamos cambios

Cuando actualicemos UMBRALES (nuevos nodos, nuevos dominios, mejoras), solo hay que hacer:

```bash
git add .
git commit -m "descripción del cambio"
git push
```

Vercel detecta el push y redeploya automáticamente en 1-2 minutos.

---

## Checklist pre-lanzamiento

- [x] Repositorio creado en GitHub
- [x] Código subido con `git push`
- [x] Deploy en Vercel exitoso
- [x] URL pública funcionando
- [ ] URL agregada en la descripción del canal de YouTube
- [ ] URL mencionada en el video piloto
- [x] Link en el README del proyecto

---

*Una vez deployado, cualquier persona en el mundo puede abrir UMBRALES desde su navegador sin instalar nada.*
