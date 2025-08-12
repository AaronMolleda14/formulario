// encuesta-frontend/src/components/formulario.jsx
import { useState } from 'react'
import axios from 'axios'

export default function Formulario() {
    const [formData, setFormData] = useState({
        nombre: '',
        cantVideos: '',
        tiempoVideos: '',
        necesitaMiniatura: '',
        necesitaDescripcion: '',
        imagenes: '',
        origenImagenes: '',
        gustos: '',
        cantVideosCortos: '',
        formaEntrega: '',
        tiempoEntrega: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        try {
            const response = await axios.post('https://9cd12d95b554.ngrok-free.app/api/respuestas', formData)
            
            console.log('Respuesta guardada:', response.data)
            setSubmitStatus('success')
            
            // Reset form after successful submission
            setFormData({
                nombre: '',
                cantVideos: '',
                tiempoVideos: '',
                necesitaMiniatura: '',
                necesitaDescripcion: '',
                imagenes: '',
                origenImagenes: '',
                gustos: '',
                cantVideosCortos: '',
                formaEntrega: '',
                tiempoEntrega: ''
            })
        } catch (error) {
            console.error('Error al enviar el formulario:', error)
            
            if (error.response) {
                // Server responded with error status
                console.error('Error del servidor:', error.response.data)
                setSubmitStatus('error')
            } else if (error.request) {
                // Request was made but no response received
                console.error('No se recibió respuesta del servidor')
                setSubmitStatus('error')
            } else {
                // Something else happened
                console.error('Error:', error.message)
                setSubmitStatus('error')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="form-container">
            <h1 className="form-title">Cuestionario de Preferencias</h1>

            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Nombre y Apellido</label><br />
                    <input 
                        className="form-input"
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    /><br /><br />

                    <h2 className="form-subtitle">Preferencias de Videos Estándar</h2>

                    <label className="form-label">
                        Seleccione la cantidad de videos estándar que desea publicar semanalmente.
                    </label><br />
                    <select
                        className="form-select"
                        name="cantVideos"
                        value={formData.cantVideos}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="Uno por stream">Uno por stream</option>                       
                        <option value="Uno - Tres">Uno - Tres</option>
                        <option value="Tres - Cinco">Tres - Cinco</option>
                        <option value="Uno cada día">Uno cada día</option>
                        <option value="Cada que lo necesite">Cada que lo necesite</option>
                    </select><br /><br />

                    <label className="form-label">
                        Seleccione la duración aproximada de los videos estándar.
                    </label><br />
                    <select
                        className="form-select"
                        name="tiempoVideos"
                        value={formData.tiempoVideos}
                        onChange={handleChange}
                        required
                        >
                        <option value="">Selecciona una opción</option>                       
                        <option value="10 - 15 minutos">10 - 15 minutos</option>
                        <option value="15 - 20 minutos">15 - 20 minutos</option>
                        <option value="El tiempo que sea necesario">El tiempo que sea necesario</option>
                    </select><br /><br />

                    <label className="form-label">
                        ¿Necesita miniatura para los videos?
                    </label><br />
                    <input
                        type="radio"
                        className="form-radio"
                        name="necesitaMiniatura"
                        value="Si"
                        checked={formData.necesitaMiniatura === "Si"}
                        onChange={handleChange}
                        required
                    /> <span className="form-radio-label">Si</span><br />
                    <input
                        type="radio"
                        className="form-radio"
                        name="necesitaMiniatura"
                        value="No"
                        checked={formData.necesitaMiniatura === "No"}
                        onChange={handleChange}
                        required
                    /> <span className="form-radio-label">No</span><br /><br />

                    <label className="form-label">
                        ¿Cuenta con una descripción para los videos?
                    </label><br />
                    <input
                        type="radio"
                        className="form-radio"
                        name="necesitaDescripcion"
                        value="Si"
                        checked={formData.necesitaDescripcion === "Si"}
                        onChange={handleChange}
                        required
                    /> <span className="form-radio-label">Si, solo se debe modificar</span><br />
                    <input
                        type="radio"
                        className="form-radio"
                        name="necesitaDescripcion"
                        value="No"
                        checked={formData.necesitaDescripcion === "No"}
                        onChange={handleChange}
                        required
                    /> <span className="form-radio-label">No, debe ser creada</span><br /><br />

                    <label className="form-label">
                        ¿Cuenta con imagenes que representen a las personas que salen en el video?
                    </label><br />
                    <input
                        type="radio"
                        className="form-radio"
                        name="imagenes"
                        value="Si"
                        checked={formData.imagenes === "Si"}
                        onChange={handleChange}
                        required
                    /> <span className="form-radio-label">Si las tengo</span><br />
                    <input
                        type="radio"
                        className="form-radio"
                        name="imagenes"
                        value="No"
                        checked={formData.imagenes === "No"}
                        onChange={handleChange}
                        required
                    /> <span className="form-radio-label">No las tengo</span><br /><br />

                    <label className="form-label">
                    En caso de no contar con una imagen para una persona especifica. ¿De donde desea que sean extraidas las imagenes para representar a las personas en el video?
                    </label><br />
                    <select
                        className="form-select"
                        name="origenImagenes"
                        value={formData.origenImagenes}
                        onChange={handleChange}
                        required
                        >
                        <option value="">Selecciona una opción</option>
                        <option value="Personajes de anime">Personajes de anime</option>
                        <option value="Personajes de caricaturas">Personajes de caricaturas</option>
                        <option value="Necesito imagenes personalizadas">Necesito imagenes personalizadas</option>
                        <option value="Otro">Otro</option>
                    </select><br /><br />

                    <label className="form-label">Escriba al menos 3 caricaturas o animes de su preferencia.</label><br />
                    <textarea
                        className="form-textarea"
                        name="gustos"
                        value={formData.gustos}
                        onChange={handleChange}
                        rows="5"
                        cols="30"
                        required
                    ></textarea><br /><br />

                    <h2 className="form-subtitle">Preferencias de Videos Cortos</h2>
                    <label className="form-label">
                        Seleccione la cantidad de videos cortos que desea publicar.  
                    </label><br />
                    <select
                        className="form-select"
                        name="cantVideosCortos"
                        value={formData.cantVideosCortos}
                        onChange={handleChange}
                        required
                        >
                        <option value="">Selecciona una opción</option>
                        <option value="Uno por stream">Uno por stream</option>
                        <option value="Uno - Tres">Uno - Tres</option>
                        <option value="Tres - Cinco">Tres - Cinco</option>
                        <option value="Cada que lo necesite">Cada que lo necesite</option>
                        <option value="Tantos como sean necesarios">Tantos como sea posible</option>
                        <option value="No tengo preferencia">No tengo preferencia</option>
                    </select><br /><br />

                    <h2 className="form-subtitle">Preferencias Generales</h2>
                    <label className="form-label">
                        ¿De que forma prefiere la entrega de los videos?
                    </label><br />
                    <select
                        className="form-select"
                        name="formaEntrega"
                        value={formData.formaEntrega}
                        onChange={handleChange}
                        required
                        >
                        <option value="">Selecciona una opción</option>
                        <option value="Google Drive">Google Drive</option>
                        <option value="DropBox">DropBox</option>
                        <option value="Subida directa a YouTube">Directo al canal de YouTube como borrador</option>
                        <option value="No estoy seguro">No estoy seguro</option>
                    </select><br /><br />

                    <label className="form-label">
                        ¿En cuanto tiempo le gustaría recibir la entrega de los videos?
                    </label><br />
                    <select
                        className="form-select"
                        name="tiempoEntrega"
                        value={formData.tiempoEntrega}
                        onChange={handleChange}
                        required
                        >
                        <option value="">Selecciona una opción</option>
                        <option value="24 horas máximo">24 horas máximo</option>
                        <option value="48 horas máximo">48 horas máximo</option>
                        <option value="No tengo preferencia">No tengo preferencia</option>
                    </select><br /><br />

                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </button><br /><br />

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                        <div className="success-message">
                            ¡Formulario enviado exitosamente! Sera contactado en menos de 24 horas.
                        </div>
                    )}
                    
                    {submitStatus === 'error' && (
                        <div className="error-message">
                            Hubo un error al enviar el formulario. Por favor, intenta nuevamente.
                        </div>
                    )}
                </div>
            </form>

        </div>
    )
}