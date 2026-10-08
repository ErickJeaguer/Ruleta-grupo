// Definición rigurosa de los 3 Nodos Pedagógicos Institucionales
// Unidad Educativa Particular New Düsseldorf

const INSTITUTIONAL_NODES = [
  {
    id: "nodo-1",
    nodeNumber: "NODO I",
    title: "Entorno Institucional",
    shortTitle: "Entorno Institucional",
    subtitle: "Caracterización del Clima Escolar y Cultura Institucional",
    color: "#0A1E3F",
    textColor: "#FFFFFF",
    badgeColor: "#1E3A8A",
    image: "nodo1.jpg",
    summary: "Diagnóstico y fundamentación de la convivencia armónica, la disciplina positiva y los principios formativos de la Unidad Educativa Particular New Düsseldorf.",
    sections: [
      {
        heading: "1. Caracterización del Clima Escolar",
        content: `
          <p>El clima escolar en la <strong>Unidad Educativa Particular New Düsseldorf</strong> se configura como un ecosistema de seguridad socioafectiva, rigor intelectual y respeto irrestricto a la dignidad humana. Se fundamenta en los siguientes pilares operativos:</p>
          <ul>
            <li><strong>Convivencia Democrática y Dialógica:</strong> Relaciones interpersonales horizontales y transparentes entre directivos, equipo docente, estudiantes y familias, respaldadas por un Código de Convivencia participativo.</li>
            <li><strong>Disciplina Formativa y Positiva:</strong> Superación de modelos punitivos tradicionales; las faltas se abordan mediante la reflexión guiada, acuerdos de reparación y responsabilización ética del estudiante.</li>
            <li><strong>Cultura de Altas Expectativas:</strong> Promoción activa de la autoconfianza y la resiliencia en los educandos, reconociendo el error como punto de partida constructivo para el aprendizaje.</li>
            <li><strong>Ambientes de Aprendizaje Estimulantes:</strong> Infraestructura moderna orientada al bienestar (aulas climatizadas de aforo controlado, laboratorios científicos de biotecnología, biblioteca activa, invernadero hidropónico y zonas de recreación protegidas).</li>
          </ul>
        `
      },
      {
        heading: "2. Cultura de la Unidad Educativa",
        content: `
          <p>La cultura institucional sintetiza el <em>Humanismo Pedagógico</em> con la tradición científica humboldtiana, contextualizada en la realidad del cantón Milagro y el país:</p>
          <ul>
            <li><strong>Identidad y Misión Humboldtiana:</strong> Formación integral basada en el pensamiento analítico riguroso, la investigación empírica y el dominio trilingüe (Español, Alemán e Inglés).</li>
            <li><strong>Valores Institucionales Nucleares:</strong> Integridad ética, disciplina intelectual, solidaridad social, sostenibilidad ambiental y búsqueda constante de la excelencia.</li>
            <li><strong>Superación del Modelo Memorístico:</strong> La cultura evaluativa institucional pondera en un 45% la producción práctica (informes científicos formato IEEE/APA, prototipos funcionales y ensayos experimentales).</li>
            <li><strong>Sentido de Pertenencia y Comunidad:</strong> Tradiciones académicas como ferias de ciencias aplicadas, semanas culturales interdisciplinarias y vinculación constante con el entorno agroecológico local.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: "nodo-2",
    nodeNumber: "NODO II",
    title: "Rol del Docente Mediador",
    shortTitle: "Docente Mediador",
    subtitle: "Funciones de Gestión del Aula y Estrategia Didáctica Contextualizada",
    color: "#854D0E",
    textColor: "#FFFFFF",
    badgeColor: "#A16207",
    image: "nodo2.jpg",
    summary: "Sistematización de las competencias docentes para la conducción pedagógica del aula y diseño de la estrategia didáctica 'Ecosistema de Indagación Aplicada'.",
    sections: [
      {
        heading: "1. Funciones Esenciales de Gestión del Aula",
        content: `
          <p>El docente de New Düsseldorf no actúa como un mero transmisor enciclopédico de datos, sino como un <strong>arquitecto del aprendizaje y mediador sociocultural</strong>, ejerciendo las siguientes funciones clave:</p>
          <ul>
            <li><strong>Diseño Curricular y Contextualización:</strong> Adaptación de los estándares nacionales e internacionales a problemáticas situadas del entorno real de los estudiantes.</li>
            <li><strong>Andamiaje Cognitivo y Preguntas Socráticas:</strong> Intervención pedagógica gradual para elevar el nivel de procesamiento cognitivo, facilitando la transición de la zona de desarrollo real a la zona de desarrollo próximo.</li>
            <li><strong>Gestión Dinámica de Ambientes de Aula:</strong> Organización del tiempo pedagógico, mediación en dinámicas grupales, fomento de la escucha activa y optimización de recursos tecnológicos.</li>
            <li><strong>Evaluación Formativa y Retroalimentación Oportuna:</strong> Implementación de rúbricas analíticas, autoevaluación, coevaluación y portafolios de evidencias con devoluciones cualitativas inmediatas.</li>
            <li><strong>Liderazgo Socioemocional:</strong> Detección temprana de barreras de aprendizaje o vulnerabilidades afectivas, articulando apoyo continuo con el Departamento de Consejería Estudiantil (DECE).</li>
          </ul>
        `
      },
      {
        heading: "2. Propuesta de Estrategia Didáctica Contextualizada",
        content: `
          <div class="strategy-box">
            <h4>Estrategia: "Ecosistema de Indagación Aplicada"</h4>
            <p><strong>Enfoque Teórico Integrador:</strong> Constructivismo Sociocultural (Vygotsky, Piaget, Ausubel) articulado con Aprendizaje Colaborativo y Aprendizaje Basado en Problemas (ABP).</p>
          </div>
          <ol>
            <li><strong>Fase 1 — Planteamiento del Desafío Real:</strong> Presentación de un dilema real del contexto agrícola o tecnológico de Milagro (ejemplo: optimización de sustratos en el invernadero hidropónico institucional frente al estrés hídrico).</li>
            <li><strong>Fase 2 — Conformación de Equipos Colaborativos Heterogéneos:</strong> Asignación de roles interdependientes (Coordinador, Investigador, Documentador y Analista de Datos).</li>
            <li><strong>Fase 3 — Indagación Guiada y Construcción de Hipótesis:</strong> Los estudiantes contrastan conceptos teóricos con experimentos prácticos de laboratorio.</li>
            <li><strong>Fase 4 — Desarrollo del Prototipo / Solución:</strong> Elaboración de un informe técnico con estructura científica o un modelo funcional aplicable.</li>
            <li><strong>Fase 5 — Socialización Dialógica y Metacognición:</strong> Defensa plenaria de resultados y evaluación compartida de los aprendizajes obtenidos.</li>
          </ol>
        `
      }
    ]
  },
  {
    id: "nodo-3",
    nodeNumber: "NODO III",
    title: "Comunidad y Proyecto de Vida",
    shortTitle: "Comunidad y Proyecto de Vida",
    subtitle: "Propuesta de Proyecto Profesional Institucional",
    color: "#0F766E",
    textColor: "#FFFFFF",
    badgeColor: "#115E59",
    image: null,
    summary: "Diseño y presentación formal del proyecto 'Humboldt Futuro: Semillero de Liderazgo Vocacional y Vinculación Comunitaria'.",
    sections: [
      {
        heading: "1. Fundamentación del Vínculo Escuela-Comunidad",
        content: `
          <p>La educación cobra pleno sentido cuando trasciende las paredes del aula y se proyecta hacia la transformación ética del entorno social. La Unidad Educativa New Düsseldorf asume la responsabilidad de formar bachilleres con proyectos de vida sólidos, arraigados en vocaciones profesionales pertinentes y con alto compromiso ciudadano.</p>
        `
      },
      {
        heading: "2. Propuesta del Proyecto Profesional: 'Humboldt Futuro'",
        content: `
          <div class="strategy-box">
            <h4>Proyecto: "Semillero de Liderazgo Vocacional y Vinculación Comunitaria 'Humboldt Futuro'"</h4>
            <p><strong>Objetivo General:</strong> Consolidar la orientación vocacional y profesional de los educandos mediante proyectos de aprendizaje-servicio interdisciplinarios orientados a las demandas ecológicas, agroindustriales y sociales del cantón y la región.</p>
          </div>
          <ul>
            <li><strong>Eje 1 — Mentoría y Orientación Vocacional Temprana:</strong> Alianzas estratégicas con universidades públicas y privadas, visitas guiadas a laboratorios e industrias de la región, y acompañamiento personalizado en el perfil vocacional individual.</li>
            <li><strong>Eje 2 — Aprendizaje-Servicio Comunitario (ApS):</strong> Equipos de bachillerato aplican sus aprendizajes en biotecnología y software asesorando a pequeños productores agrícolas locales.</li>
            <li><strong>Eje 3 — Escuela Abierta a la Familia y Red Comunitaria:</strong> Encuentros trimestrales donde padres de familia, profesionales del medio y estudiantes comparten trayectorias de vida y perspectivas laborales futuras.</li>
            <li><strong>Eje 4 — Incubadora de Iniciativas Juveniles:</strong> Acompañamiento metodológico para los mejores proyectos de graduación con impacto social comprobable antes del egreso escolar.</li>
          </ul>
        `
      }
    ]
  }
];

window.INSTITUTIONAL_NODES = INSTITUTIONAL_NODES;
