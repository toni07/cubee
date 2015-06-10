// attributes
	private static final long serialVersionUID = 1565785544L;
	private static Logger LOGGER = Logger.getLogger(PeseeServlet.class);
	private static final String HTTP_INPUT_ID_SORTIE = "id-sortie";
	private static final List<DBField> listGUIField = new ArrayList<DBField>();
	private static final List<String> operatorList = new ArrayList<String>();

	static {
		listGUIField.add(new DBField(0, "num_pesee", "p.num_pesee", "N° pesée", true, true));
		listGUIField.add(new DBField(1, "date_ent_pesee", "DATE_FORMAT(p.date_ent_pesee, '%d/%m/%Y')", "Date entrée", true, true));
		listGUIField.add(new DBField(2, "num_park_camion", "c.num_park_camion", "Num park", true, true));
		listGUIField.add(new DBField(3, "ptac_camion", "c.ptac_camion", "Ptac", true, true));
		listGUIField.add(new DBField(4, "charge_utile_camion", "c.charge_utile_camion", "Charge utile", true, true));
		listGUIField.add(new DBField(5, "nom_data_provider", "dp.nom_data_provider", "Fournisseur", true, true));
		listGUIField.add(new DBField(6, "poids_net_pesee", "p.poids_net_pesee", "Poids net", true, true));
		listGUIField.add(new DBField(7, "num_tour_code_pesee", "p.num_tour_code_pesee", "N° tour", true, true));
		listGUIField.add(new DBField(8, "taux_remp_reel_pesee", "p.taux_remp_reel_pesee", "Tx remp. réel", true, true));
		listGUIField.add(new DBField(9, "taux_remp_stat_pesee", "p.taux_remp_stat_pesee", "Tx remp. stat", true, true));
		listGUIField.add(new DBField(10, "nom_organisation", "orga.nom_organisation", "Organisation", true, true));
		listGUIField.add(new DBField(11, "nom_type_dechet", "td.nom_type_dechet", "Type déchet", true, true));
		listGUIField.add(new DBField(12, "list_error", "has_pesee_in_error.list_error", "Erreurs", true, true));
		listGUIField.add(new DBField(13, "id_pesee", "p.id_pesee", "Id pesée", true, true));
		listGUIField.add(new DBField(14, "id_camion", "c.id_camion", "Id camion", true, true));

		operatorList.add(" = ");
		operatorList.add(" >= ");
		operatorList.add(" <= ");
		operatorList.add(" LIKE ");
	}
	
	//methods
	final String[] fIdStr = request.getParameterValues("fId");
					final String[] fOrder = request.getParameterValues("fOrder");
					final String[] filterColumn = request.getParameterValues("filtercolumn");
					final String[] filterOperator = request.getParameterValues("filteroperator");
					final String[] filterValueList = request.getParameterValues("filtervalue");

					final Integer[] displayedFieldListId = NumberHelper.stringToInteger(fIdStr);		//fields that are asked as columns of the table
					final Integer[] filteredFieldListId = NumberHelper.stringToInteger(filterColumn);		//fields that are asked for filtering the Query
					final Integer[] operatorFieldListId = NumberHelper.stringToInteger(filterOperator);		//operators that are asked for filtering the Query
					final Integer[] orderFieldListId = NumberHelper.stringToInteger(fOrder);		//orders of each of the asked columns

					final Integer nbResultPerPageStr = NumberHelper.stringToInteger(request.getParameter("nbResultPerPage"));
					final Integer pageNumber = NumberHelper.stringToInteger(request.getParameter("pagenum"));

					final String where = buildWhere(filteredFieldListId, operatorFieldListId, filterValueList);
					final String orderBy = buildOrderBy(displayedFieldListId, orderFieldListId);
