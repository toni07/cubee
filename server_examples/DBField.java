/**
 * Utility class that maps a field of DB to a field in an HTML <table> (list of objects)
 * @author toni07
 */
public class DBField {

	/**
	 * **************************************************************************************
	 * attributes
	 * **************************************************************************************
	 */
	private Integer id;
	private String objectAttribute;
	private String columnSQLQuery;    //nom de la colonne ou requête SQL pour récupérer la valeur voulue
	private String columnNameInInterface; //nom de la colonne dans l'interface
	private Boolean isDisplayed; //true si la colonne est affichée par défaut dans l'interface
	private Boolean isVisible; //true si la colonne est affichée par défaut dans l'interface

	/**
	 * **************************************************************************************
	 * constructor
	 * **************************************************************************************
	 */
	public DBField(Integer id, String objectAttribute, String columnSQLQuery, String columnNameInInterface, Boolean isDisplayed, Boolean isVisible) {
		this.id = id;
		this.objectAttribute = objectAttribute;
		this.columnSQLQuery = columnSQLQuery;
		this.columnNameInInterface = columnNameInInterface;
		this.isDisplayed = isDisplayed;
		this.isVisible = isVisible;
	}

	/**
	 * **************************************************************************************
	 * getters & setters
	 * **************************************************************************************
	 */
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getObjectAttribute() {
		return objectAttribute;
	}

	public void setObjectAttribute(String objectAttribute) {
		this.objectAttribute = objectAttribute;
	}

	public String getColumnSQLQuery() {
		return columnSQLQuery;
	}

	public void setColumnSQLQuery(String columnSQLQuery) {
		this.columnSQLQuery = columnSQLQuery;
	}

	public String getColumnNameInInterface() {
		return columnNameInInterface;
	}

	public void setColumnNameInInterface(String columnNameInInterface) {
		this.columnNameInInterface = columnNameInInterface;
	}

	public Boolean getIsDisplayed() {
		return isDisplayed;
	}

	public void setIsDisplayed(Boolean isDisplayed) {
		this.isDisplayed = isDisplayed;
	}

	public Boolean getIsVisible() {
		return isVisible;
	}

	public void setIsVisible(Boolean isVisible) {
		this.isVisible = isVisible;
	}
}
