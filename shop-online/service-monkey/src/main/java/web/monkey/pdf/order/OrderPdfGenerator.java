package web.monkey.pdf.order;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.draw.VerticalPositionMark;

import core.common.format.DateFormatter;
import web.monkey.pdf.PdfGenerator;
import web.monkey.pdf.builder.TableBuilder;
import web.monkey.pdf.order.OrderPdfGeneratorModel.OrderPdfDetail;

public class OrderPdfGenerator extends PdfGenerator<OrderPdfGeneratorModel> {

	private long orderId;

	public OrderPdfGenerator(long orderId) {
		this.orderId = orderId;
	}

	//
	// @Override
	// public boolean generate(OrderPdfGeneratorModel model, OutputStream out) {
	// try {
	// Document document = new Document();
	// PdfWriter.getInstance(document, out);
	// document.open();
	// Font font = getFont();
	// Font bold = getFontBold();
	//
	// Paragraph p = new Paragraph("Công ty: " + model.getCompany(), font);
	// p.setAlignment(Element.ALIGN_CENTER);
	// document.add(p);
	//// document.add(new Paragraph().add("Số Điện thoại: " +
	// StringUtils.defaultString(model.getPhone())).setFont(font).setHorizontalAlignment(HorizontalAlignment.LEFT));
	//// document.add(new Paragraph().add("Địa chỉ: " +
	// StringUtils.defaultString(model.getAddress())).setFont(font).setHorizontalAlignment(HorizontalAlignment.LEFT));
	////
	//// document.add(new Paragraph().add(new Text("PHIẾU XUẤT
	// KHO").setFont(bold).setFontSize(20f).setHorizontalAlignment(HorizontalAlignment.CENTER)));
	//// document.add(new Paragraph().add("Ngày: " +
	// DateFormatter.ddMMyyyyHHMMSS().format(model.getCurrentDate())).setFont(font).setHorizontalAlignment(HorizontalAlignment.CENTER));
	////
	//// document.add(new Paragraph().add("Kho hàng:
	// ").setFont(bold).add(model.getWarehouse()).setFont(font).setHorizontalAlignment(HorizontalAlignment.LEFT));
	//// document.add(new Paragraph().add("Người nhận:
	// ").setFont(bold).add(model.getEmployee()).setFont(font).setHorizontalAlignment(HorizontalAlignment.LEFT));
	////
	//// document.add(new Paragraph().add("Ghi chú:
	// ").setFont(bold).add(StringUtils.defaultString(model.getDescription())).setFont(font).setHorizontalAlignment(HorizontalAlignment.LEFT));
	////
	//// // table
	////
	//// document.add(new Paragraph().add(new Text("NV Bán
	// Hàng").setFont(bold).setHorizontalAlignment(HorizontalAlignment.LEFT)).
	//// add(new Text("NV Xuất
	// kho").setFont(bold).setHorizontalAlignment(HorizontalAlignment.CENTER)).
	//// add(new Text("Người
	// nhận").setFont(bold).setHorizontalAlignment(HorizontalAlignment.RIGHT)));
	//
	// document.close();
	// return true;
	// } catch (Exception e) {
	// LOGGER.error("Can not genereate PDF file: ", e);
	// }
	//
	// return false;
	// }
	@Override
	protected void generate(OrderPdfGeneratorModel model, Document document) throws Exception {
		// ServiceMonkeyTranslation nsl = ServiceMonkeyTranslation.get();
		Font font = getFont();
		Font bold = getFontBold();
		Font titleFont = getFontBold(20);

		createParagraphBuilder(font).add("Công ty: ", model.getCompany()).build(document);
		createParagraphBuilder(font).add("Số Điện thoại: ", model.getPhone()).build(document);
		createParagraphBuilder(font).add("Địa chỉ: ", model.getAddress()).build(document);
		
		document.add(Chunk.NEWLINE);

		createParagraphBuilder(titleFont, Element.ALIGN_CENTER).add("PHIẾU XUẤT KHO").build(document);
		createParagraphBuilder(font, Element.ALIGN_CENTER)
				.add("Ngày: ", DateFormatter.ddMMyyyyHHMMSS().format(model.getCurrentDate())).build(document);

		document.add(Chunk.NEWLINE);
		document.add(Chunk.NEWLINE);

		createPhraseBuilder().add(bold, "Kho hàng: ").add(font, model.getWarehouse()).build(document);
		createPhraseBuilder().add(bold, "Người nhận: ").add(font, model.getEmployee()).build(document);
		
		TableBuilder table = createTableBuilder().addHeader(bold, new String[] {"Tên Sản Phẩm", "Số lượng", "Ghi chú"});
		for (OrderPdfDetail detail : model.getDetails()) {
			table.addRow(font, new String[] {detail.getProductName(), detail.getRemaining(), detail.getDescription()});
		}
		table.build(document);
		
		document.add(Chunk.NEWLINE);
		createPhraseBuilder().add(bold, "Ghi chú: ").add(font, model.getDescription()).build(document);
		
		document.add(Chunk.NEWLINE);
		Phrase p = new Phrase();
		Chunk glue = new Chunk(new VerticalPositionMark());
		p.add(new Chunk("NV Bán Hàng", bold));
	    p.add(glue);
	    p.add(new Chunk("NV Xuất kho", bold));
	    p.add(glue);
	    p.add(new Chunk("Người nhận", bold));
	    document.add(p);
	}
}
