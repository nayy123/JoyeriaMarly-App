package com.marly.handmade.service;

import com.marly.handmade.domain.pedido.modal.Pedido;
import com.marly.handmade.domain.pedido.repository.PedidoRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.IOException;
import java.util.List;

@Service
public class ReporteService {

    private final PedidoRepository pedidoRepository;

    public ReporteService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    public void generateExcel(HttpServletResponse response) throws IOException {
        List<Pedido> pedidoList = pedidoRepository.findAll();
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Información Pedidos");

        // Crear estilo
        XSSFCellStyle headerStyle = createHeaderStyle(workbook);
        XSSFCellStyle cellStyle = createCellStyle(workbook);
        XSSFCellStyle dateStyle = createDateStyle(workbook, cellStyle);

        // Crear encabezado
        createHeaderRow(sheet, headerStyle);

        // Llenar dato
        fillDataRows(sheet, pedidoList, cellStyle, dateStyle);

        // Ajustar columna
        autoSizeColumns(sheet, 6);

        sendResponse(response, workbook);
    }

    private XSSFCellStyle createHeaderStyle(XSSFWorkbook workbook) {
        XSSFCellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setColor(new XSSFColor(new Color(255, 255, 255), null));
        style.setFont(font);
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setFillForegroundColor(new XSSFColor(new Color(33, 150, 243), null));
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        setBorders(style);
        return style;
    }

    private XSSFCellStyle createCellStyle(XSSFWorkbook workbook) {
        XSSFCellStyle style = workbook.createCellStyle();
        setBorders(style);
        return style;
    }

    private XSSFCellStyle createDateStyle(XSSFWorkbook workbook, XSSFCellStyle baseStyle) {
        XSSFCellStyle dateStyle = workbook.createCellStyle();
        dateStyle.cloneStyleFrom(baseStyle);
        XSSFDataFormat format = workbook.createDataFormat();
        dateStyle.setDataFormat(format.getFormat("dd-mm-yyyy"));
        return dateStyle;
    }

    private void createHeaderRow(XSSFSheet sheet, XSSFCellStyle headerStyle) {
        XSSFRow header = sheet.createRow(0);
        String[] headers = {"ID", "Fecha", "Entregado", "Dirección de Envío", "Total", "Cliente"};
        for (int i = 0; i < headers.length; i++) {
            XSSFCell cell = header.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }
        header.setHeightInPoints(20);
    }

    private void fillDataRows(XSSFSheet sheet, List<Pedido> pedidos, XSSFCellStyle cellStyle, XSSFCellStyle dateStyle) {
        int rowIndex = 1;
        for (Pedido pedido : pedidos) {
            XSSFRow row = sheet.createRow(rowIndex++);
            createDataCell(row, 0, pedido.getIdPedido(), cellStyle);

            XSSFCell fechaCell = row.createCell(1);
            if (pedido.getFechaPedido() != null) {
                fechaCell.setCellValue(pedido.getFechaPedido());
                fechaCell.setCellStyle(dateStyle);
            } else {
                fechaCell.setCellValue("");
                fechaCell.setCellStyle(cellStyle);
            }

            createDataCell(row, 2, pedido.getEstado(), cellStyle);
            createDataCell(row, 3, pedido.getDireccionEnvio(), cellStyle);
            createDataCell(row, 4, pedido.getTotal(), cellStyle);
            createDataCell(row, 5, pedido.getCliente().getNombres(), cellStyle);
        }
    }

    private void createDataCell(XSSFRow row, int column, Object value, XSSFCellStyle style) {
        XSSFCell cell = row.createCell(column);
        if (value instanceof Number num) {
            cell.setCellValue(num.doubleValue());
        } else {
            cell.setCellValue(value != null ? value.toString() : "");
        }
        cell.setCellStyle(style);
    }

    private void autoSizeColumns(XSSFSheet sheet, int totalColumns) {
        for (int i = 0; i < totalColumns; i++) {
            sheet.autoSizeColumn(i);
        }
    }

    private void setBorders(XSSFCellStyle style) {
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
    }

    private void sendResponse(HttpServletResponse response, XSSFWorkbook workbook) throws IOException {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=pedidos.xlsx");

        try (var out = response.getOutputStream()) {
            workbook.write(out);
            out.flush();
        }
        workbook.close();
    }
}
