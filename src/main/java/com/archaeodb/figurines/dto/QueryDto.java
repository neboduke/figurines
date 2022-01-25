package com.archaeodb.figurines.dto;

import javax.persistence.Column;
import javax.persistence.Id;

public class QueryDto {

        private Integer queryId;
        private String queryName;
        private String search;
        private String operator;
        private String chronology;
        private String motif;
        private String context;

        public QueryDto(Integer queryId,
                 String queryName,
                 String search,
                 String operator,
                 String chronology,
                 String motif,
                 String context){
            this.queryId = queryId;
            this.queryName = queryName;
            this.search = search;
            this.operator = operator;
            this.chronology = chronology;
            this.motif = motif;
            this.context = context;
        }

        public String getContext() {
            return context;
        }

        public void setContext(String context) {
            this.context = context;
        }

        public String getMotif() {
            return motif;
        }

        public void setMotif(String motif) {
            this.motif = motif;
        }

        public String getChronology() {
            return chronology;
        }

        public void setChronology(String chronology) {
            this.chronology = chronology;
        }

        public String getOperator() {
            return operator;
        }

        public void setOperator(String operator) {
            this.operator = operator;
        }

        public String getSearch() {
            return search;
        }

        public void setSearch(String search) {
            this.search = search;
        }

        public String getQueryName() {
            return queryName;
        }

        public void setQueryName(String queryName) {
            this.queryName = queryName;
        }

        public Integer getId() {
            return queryId;
        }

        public void setId(Integer id) {
            this.queryId = queryId;
        }
}
