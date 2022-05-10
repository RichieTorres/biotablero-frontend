const NOSInferredTexts = {};

NOSInferredTexts.info = `<p>La riqueza de especies mide el número de especies que se encuentran en un área de consulta, identificando zonas con alta o baja concentración. La riqueza puede ser utilizada como un indicador del estado de la biodiversidad del área consultada siempre y cuando se acompañe de información sobre la identidad y estado de las especies presentes. Un valor alto de riqueza, no necesariamente indica un buen estado de conservación. Se recomienda leer este indicador en conjunto con los demás indicadores de las secciones Ecosistemas y Paisajes en <a href="http://biotablero.humboldt.org.co/Consultas" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}> BioTablero</a>, para identificar un panorama más amplio sobre el estado de la biodiversidad del área de consulta.
<br />
<br />
Los valores de riqueza de especies se presentan de manera relativa para que el usuario pueda tener puntos de comparación para el área consultada. Cada una de las barras que representan la riqueza de los tipos de especies (total, endémicas, amenazadas e invasoras) se encuentra dividida en dos secciones, representando el rango de riqueza de especies en las unidades de consulta (p.ej. departamentos · color amarillo) respecto a su región natural correspondiente (p.ej. región Andes, Caribe, Pacífico, Orinoquia o Amazonas · color naranja). Adicionalmente, se muestra con un punto sobre la barra el valor de riqueza de la unidad de consulta (p.ej. Antioquia), y el valor mínimo y máximo de las demás unidades de consulta del mismo tipo (p.ej. departamentos).
<br />
<br />
Dado que las especies presentes en Colombia se encuentra heterogéneamente representadas en las bases de datos, y la cuantificación real del número de especies tiene retos importantes de investigación relacionados con el diseño y esfuerzo de muestreo, y con la identificación taxonómica, presentamos dos aproximaciones a la cuantificación de la riqueza: riqueza inferida calculada a partir de <a href="http://biomodelos.humboldt.org.co/" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}> BioModelos</a>, y riqueza observada calculada a partir de registros georreferenciados de <a href="https://www.gbif.org/es/country/CO/summary" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}> GBIF</a>.
<br /><br />
</p>`;

NOSInferredTexts.meto = `<b>Riqueza inferida de especies</b><br /><br />
Los mapas y valores de riqueza inferida representan el número de especies que potencialmente se encuentran en un área de consulta y es calculada a partir de 5808 modelos de distribución de especies, en donde se identifican las condiciones climáticas idóneas donde las especies podrían estar presentes. Estos modelos se encuentran disponibles en <a href="http://biomodelos.humboldt.org.co/" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}> BioModelos</a> <a href="https://doi.org/10.1371/journal.pone.0214522" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}> (Velásquez-Tibatá et al. 2019)</a>
<br /><br />
Los mapas de riqueza de especies presentan valores desde 1 hasta n, dependiendo de la concentración de especies que se puedan encontrar en celdas de 1km2. Las rutinas empleadas para la construcción de los modelos se encuentran disponibles en el <a href="https://github.com/PEM-Humboldt/gsi_analysis" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>repositorio de código abierto del Laboratorio de Biogeografía Aplicada del Instituto Humboldt.</a>
<br /><br />
Para el caso de la riqueza de especies amenazadas se incluyen aquellas especies categorizadas como en peligro crítico de extinción (CR), en peligro de extinción (EN) y vulnerable (VU) según la <a href="https://www.iucnredlist.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}> UICN</a>. Para las especies invasoras se construyeron 23 BioModelos de especies de plantas (Salgado-Negret et al. Sometido) usando registros de presencias y variables bioclimáticas para obtener mapas de su distribución potencial <a href="https://onlinelibrary.wiley.com/doi/full/10.1111/j.0906-7590.2008.5203.x" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}> (Phillips & Dudik 2008)</a>. Las especies invasoras modeladas fueron priorizadas por su alto potencial de invasión en el país <a href="http://www.humboldt.org.co/es/estado-de-los-recursos-naturales/item/1059-plantas-exoticas-invasion-en-colombia" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>(Cárdenas-López et al. 2010)</a>. Las especies endémicas se identificaron considerando los listados nacionales de especies publicados a través del <a href="https://listas.biodiversidad.co/" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>SiB Colombia</a>, y se espacializaron con los mapas disponibles en el portal de la <a href="https://www.iucnredlist.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>UICN</a> (<a href="http://reporte.humboldt.org.co/biodiversidad/2018/cap2/203/" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>González et al. 2018</a>).`;

NOSInferredTexts.cons = `Al momento de interpretar los valores de riqueza inferida se debe tener en cuenta que:
<ul class="ul-padding-info-text">
  <li>
  Al ser un indicador calculado a partir de modelos de distribución de especies, es importante considerar que el número de especies reportado corresponde a un número potencial que se relaciona con la presencia probable de las especies en respuesta a las condiciones climáticas idóneas, más no de hábitat o de otro tipo de interacciones bióticas que determinan la presencia real de las especies. Mayor información puede ser consultada en <a href="http://biomodelos.humboldt.org.co/" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}> BioModelos</a> o comunicarse directamente por correo electrónico a <a href="mailto:biomodelos@humboldt.org.co" target="_blank" rel="noopener noreferrer">biomodelos@humboldt.org.co</a>.
  </li>
  <li>
  La riqueza inferida de especies se calculó con base en 5808 especies modeladas, los cuales representan sólo una muestra de las especies existentes en el país, por lo que los valores presentados no reflejan el número real de especies sobre el territorio; estos valores pueden estar sobre o subestimados. Se recomienda ver este indicador en conjunto con la riqueza observada de especies y el mapa de vacíos de información para tener un panorama más amplio de la riqueza del área de consulta.  </li>
  </ul>`;

export { NOSInferredTexts };

const NOSObservedTexts = {};

NOSObservedTexts.info = `Dado que las especies presentes en Colombia se encuentra heterogéneamente representadas en las bases de datos, y la cuantificación real del número de especies tiene retos importantes de investigación relacionados con el diseño y esfuerzo de muestreo, y con la identificación taxonómica, presentamos dos aproximaciones a la cuantificación de la riqueza: riqueza inferida calculada a partir de
<a href="http://biomodelos.humboldt.org.co/" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>
  BioModelos
</a>
, y riqueza observada calculada a partir de registros georreferenciados de
<a href="https://www.gbif.org/es/country/CO/summary" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>
  GBIF
</a>.`;

NOSObservedTexts.meto = `<b>Riqueza observada de especies</b><br /><br />
Los valores de riqueza observada representan el número de especies registradas para cada unidad de consulta, y es calculada a partir de los registros georeferenciados de <a href="https://www.gbif.org/es/country/CO/summary" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}> GBIF</a>. Los mapas de riqueza de especies presentan valores desde 1 hasta n, dependiendo del número de especies encontradas en los registros georeferenciados de cada unidad de consulta. El proceso de obtención de los registros y la cuantificación de la riqueza de especies está a cargo de la <a href="http://humboldt.org.co/es/servicios/servicios-y-recursos/infraestructura-institucional-de-datos" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>Infraestructura Institucional de Datos (I2D)</a> del Instituto Humboldt. Las rutinas para estos cálculos pueden consultarse en su <a href="https://github.com/I2DHumboldt" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>repositorio de código abierto</a>.
<br /><br />
Los valores de riqueza total fueron estimados a partir de 11.730.023 registros. La información asociada a esta descarga puede ser consultada en este <a href="https://doi.org/10.15468/dl.mktbp2" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}> enlace</a>. Para el caso de la riqueza de especies amenazadas se incluyen aquellas especies categorizadas como en peligro crítico de extinción (CR), en peligro de extinción (EN) y vulnerable (VU) según la <a href="https://www.minambiente.gov.co/wp-content/uploads/2021/10/resolucion-1912-de-2017.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>resolución 1912 de 2017</a> del Ministerio de Ambiente y Desarrollo Sostenible. Para definir las especies exóticas se utilizaron distintas fuentes de información, entre las que se encuentran  <a href="https://www.cabi.org/isc/" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>Invasive Species Compendium (ISC)</a>, <a href="http://www.iucngisd.org/gisd/" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>Global Invasive Species Database (GISD)</a>, <a href="https://www.oas.org/en/sedi/dsd/iabin/" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>Inter-American Biodiversity Information Network (IABIN)</a>, además de diversos artículos científicos. En el caso de las especies endémicas se utilizaron múltiples fuentes para validar la categoría de endemismo a nivel de país: <a href="http://amphibiaweb.org" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>AmphibiaWeb</a>, <a href="http://catalogoplantasdecolombia.unal.edu.co/es/" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>Bernal et al., 2015</a>, <a href="https://www.redalyc.org/articulo.oa?id=49120960001%253E%2520ISSN%25200124-5376" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>Maldonado-Ocampo et al, 2008</a>, <a href="https://www.redalyc.org/pdf/457/45729294008.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>Solari et al., 2013</a>, <a href="https://www.museum.lsu.edu/~Remsen/SACCCountryLists.htm" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>Species lists of birds for South American countries and territories</a>, <a href="http://www.reptile-database.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>The Reptile Database</a>, <a href="https://doi.org/10.15472/7avdhn" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>Lista del Catálogo de Plantas y Líquenes de Colombia</a>, <a href="https://doi.org/10.15472/kl1whs" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>Lista de referencias de Mamíferos de Colombia</a>, <a href="http://doi.org/10.15472/numrso" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>Lista de especies de agua dulce de Colombia</a>, <a href="http://doi.org/10.15472/qhsz0p" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>Lista de referencia de especies de aves de Colombia</a>.`;

NOSObservedTexts.cons = `Al momento de interpretar los valores de riqueza observada se debe tener en cuenta que:
<ul class="ul-padding-info-text">
  <li>
  Los registros georeferenciados no cuentan con una depuración exhaustiva y pueden contener errores de identificación taxonómica de las especies y de georeferenciación, por lo que los valores presentados no reflejan el número real de especies sobre el territorio, estos valores pueden estar sobre o subestimados.
  </li>
  <li>
  Los registros georeferenciados tienen un sesgo geográfico que está dado principalmente por la accesibilidad a los sitios de muestreo. Por esta razón, existen áreas que no han sido muestreadas en el país, y en este sentido los valores de riqueza pueden estar subestimados. Se recomienda leer este indicador en conjunto con el Análisis de Vacíos en Biodiversidad Continental para Colombia (AVBCC) disponible en <a href="http://biotablero.humboldt.org.co/Consultas" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}> BioTablero</a>, con el fin de evaluar la representatividad de los registros en el área de consulta.
  </li>
</ul>`;

export { NOSObservedTexts };

export const NumberOfSpeciesTextHelper = 'Haga click en un icono para visualizar un tipo de riqueza o ambas. En inferido puede hacer clic en cada barra para visualizar el mapa de riqueza correspondiente';

const SpeciesRecordsGapsTexts = {};

SpeciesRecordsGapsTexts.info = `<p>
  El Análisis de Vacíos en Biodiversidad Continental para Colombia (AVBCC) permite identificar las áreas del país que cuentan con datos primarios de biodiversidad disponibles en bases de datos como el
  <a href="https://sibcolombia.net/" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>
    SiB Colombia
  </a>
  y
  <a href="https://www.gbif.org/es/country/CO/summary" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>
    GBIF
  </a>
  , por lo que identifica sitios con vacíos de información, y por ende las áreas en las cuales se requieren esfuerzos de muestreos adicionales para mejorar el conocimiento de la biodiversidad. Esta aproximación se realiza calculando tres componentes: i) Concentración de los datos en el espacio geográfico a partir de un cálculo de densidad de registros. ii) Representatividad ambiental, siguiendo la metodología propuesta por
  <a href="https://doi.org/10.1111/ddi.13137" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>
    Aguiar et al. (2020)
  </a>
  , la cual modela los registros de especies sobre variables bioclimáticas para identificar las regiones no estudiadas que son ambientalmente diferentes. iii) Complementariedad de la riqueza de especies, la cual calcula la presencia de especies según la densidad de registros en celdas de 1km2, y con base estimaciones no paramétricas de
  <a href="https://doi.org/10.2307/2530802" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>
    Jackknife
  </a>
  de primer orden, se estima la riqueza esperada en cada celda, siendo el valor de complementariedad, la diferencia entre el valor estimado y el esperado. La ruta metodológica hace parte de la propuesta de
  <a href="https://doi.org/10.7809/b-e.00057" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>
    García Márquez et al. (2012)
  </a>
  para la estimación de un índice espacial de los registros de especies, y cuenta con algunos ajustes para el país.
  <br /><br />
  Cada uno de los componentes del AVBCC resulta en un mapa con valores entre 0 y 100 %, siendo 100 sobre lugares donde ocurren mayores vacíos de información en registros, información ambiental o complementariedad en la riqueza de especies, y 0 sobre áreas bien representadas de acuerdo a cada componente. El índice integrado AVBCC se obtiene de promediar los tres componentes. En las gráficas, se representa el AVBCC como un punto sobre la barra, y además se presentan otros seis valores útiles para su comparación: 1) el valor mínimo y 2) máximo del AVBCC en el área de consulta (p.ej. región Antioquia), 3) el valor mínimo y 4) máximo del AVBCC en las demás áreas de consulta del mismo tipo (p.ej. departamentos), 5) el valor mínimo y 6) máximo del AVBCC en la región biótica correspondiente al área de consulta (p.ej. región Andes) (Caribe, Andes, Pacífico, Orinoquia, Amazonas) (color naranja).
</p>`;

SpeciesRecordsGapsTexts.quote = `El mapa de vacíos se encuentra disponible en el
<a href="http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/f21ec6a3-d8ac-4d1b-aacf-c4030f60a924" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>
  repositorio de datos geográficos del Instituto Humboldt
</a>.
Todos los análisis se hicieron en el paquete estadístico R, y las rutinas que se emplearon para el cálculo del AVBCC se encuentran disponibles en el
<a href="https://github.com/PEM-Humboldt/gsi_analysis" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>
  repositorio de código abierto del Programa de Evaluación y Monitoreo del Instituto Humboldt
</a>.`;

SpeciesRecordsGapsTexts.cons = `Al momento de interpretar los valores del AVBCC se debe tener en cuenta que:
<ul class="ul-padding-info-text">
  <li>
    Los registros obtenidos para el presente análisis fueron descargados en enero del 2021, de forma tal que contará con los insumos disponibles hasta diciembre 31 del 2020. A dicho conjunto de datos se les aplicaron rutinas de verificación geográfica y taxonómica que pueden ser consultadas en los siguientes enlaces:
    <a href="https://github.com/LBAB-Humboldt/workFlow/blob/master/verifTax'.R" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>
      Verificación Geográfica
    </a>,
    <a href="https://github.com/LBAB-Humboldt/workFlow/blob/master/verifGeo'.R" target="_blank" rel="noopener noreferrer" style={{ color: '#51b4c1' }}>
      Verificación Taxonómica
    </a>.
  </li>
  <li>
    La información obtenida en el presente análisis no cuantifica el nivel de sesgo de la información obtenida, dado que el número de registros presente en un sector puede estar influenciado por su cercanía a vías, ríos u otras unidades político-administrativas.
  </li>
</ul>
`;

export { SpeciesRecordsGapsTexts };
