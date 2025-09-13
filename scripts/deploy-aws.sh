#!/bin/bash

echo "🚀 Iniciando despliegue de Alitas y Patitas en AWS..."
echo "====================================================="

# Variables de configuración
APP_NAME="alitas-patitas"
S3_BUCKET="${APP_NAME}-deploy-bucket"
REGION="us-east-1"
ZIP_FILE="deployment.zip"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes de éxito
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Función para imprimir mensajes de error
error() {
    echo -e "${RED}❌ $1${NC}"
}

# Función para imprimir advertencias
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Verificar que AWS CLI está instalado
if ! command -v aws &> /dev/null; then
    error "AWS CLI no está instalado. Instálalo primero."
    exit 1
fi

# Verificar credenciales de AWS
echo "🔐 Verificando credenciales AWS..."
aws sts get-caller-identity > /dev/null 2>&1
if [ $? -ne 0 ]; then
    error "Credenciales AWS no configuradas. Ejecuta 'aws configure' primero."
    exit 1
fi

# Crear build de la aplicación
echo "📦 Creando build de la aplicación..."
npm run build
if [ $? -ne 0 ]; then
    error "Error en el build de la aplicación."
    exit 1
fi
success "Build completado exitosamente."

# Crear archivo ZIP de despliegue
echo "🗜️  Creando archivo de despliegue..."
zip -r $ZIP_FILE . -x "node_modules/*" ".git/*" ".next/*" "*.env*" "scripts/*" ".DS_Store" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    error "Error al crear el archivo ZIP."
    exit 1
fi
success "Archivo ZIP creado: $ZIP_FILE"

# Crear bucket S3 si no existe
echo "🪣 Verificando bucket S3..."
if ! aws s3 ls "s3://$S3_BUCKET" --region $REGION 2>/dev/null; then
    echo "Creando bucket S3: $S3_BUCKET"
    aws s3 mb "s3://$S3_BUCKET" --region $REGION
    if [ $? -ne 0 ]; then
        error "Error al crear el bucket S3."
        exit 1
    fi
    success "Bucket S3 creado: $S3_BUCKET"
else
    success "Bucket S3 ya existe: $S3_BUCKET"
fi

# Subir archivo a S3
echo "📤 Subiendo archivo a S3..."
aws s3 cp $ZIP_FILE "s3://$S3_BUCKET/$ZIP_FILE"
if [ $? -ne 0 ]; then
    error "Error al subir el archivo a S3."
    exit 1
fi
success "Archivo subido a S3."

# Limpiar archivo temporal
echo "🧹 Limpiando archivos temporales..."
rm -f $ZIP_FILE
success "Archivos temporales eliminados."

echo ""
echo "====================================================="
success "🚀 Despliegue completado exitosamente!"
echo ""
echo "📋 Resumen:"
echo "   • Aplicación: $APP_NAME"
echo "   • Región: $REGION"
echo "   • Bucket S3: $S3_BUCKET"
echo "   • Archivo: $ZIP_FILE"
echo ""
echo "🔜 Próximos pasos:"
echo "   1. Configurar Elastic Beanstalk o EC2"
echo "   2. Configurar base de datos en RDS"
echo "   3. Configurar CloudFront para CDN"
echo ""
echo "💡 Para ver el archivo en S3:"
echo "   aws s3 ls s3://$S3_BUCKET/"
echo "====================================================="
