module ApplicationHelper
  include Pagy::Frontend

  def active_class(link_path)
    current_page?(link_path) ? "active" : ""
  end

  def formatted_price(price)
    number_to_currency(price / 100.0, unit: "€", separator: ",", delimiter: ".", format: "%n %u")
  end
end
