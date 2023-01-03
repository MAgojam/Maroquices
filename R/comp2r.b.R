
# This file is a generated template, your changes will not be overwritten

Comp2RClass <- if (requireNamespace('jmvcore', quietly=TRUE)) R6::R6Class(
    "Comp2RClass",
    inherit = Comp2RBase,
    private = list(
        .run = function() {
            
            if(is.null(self$options$r1) || is.null(self$options$n1) || is.null(self$options$r2) || is.null(self$options$n2))
                {return()} else {

            # `self$data` contains the data
            # `self$options` contains the options
            # `self$results` contains the results object (to populate)
            
            r1 <- self$options$r1
            n1 <- self$options$n1
            r2 <- self$options$r2
            n2 <- self$options$n2
            
            z1 <- 0.5*log((1+r1)/(1-r1))
            z2 <- 0.5*log((1+r2)/(1-r2))
            z <- (z1-z2)/sqrt(1/(n1-3)+1/(n2-3))
            
            alt <- self$options$alt
            
            nota <- ifelse(alt=="bilateral", jmvcore::format("Nota: H\u2081: \u03C1\u2081 \u2260 \u03C1\u2082"),
                          ifelse(alt=="tud", "Nota: H₁: \u03C1\u2081 > \u03C1\u2082", "Nota:H₁: \u03C1\u2081 < \u03C1\u2082"))
            
            p <- ifelse(alt=="bilateral",2*pnorm(abs(z),lower.tail = FALSE),
                        ifelse(alt=="tud",pnorm(z,lower.tail = FALSE),
                               pnorm(z, lower.tail = TRUE)))

                        table <- self$results$comp2R
            
            #tabTitStr <- ('Teste a duas Correls - Amostras {dep}')
            #tabTit <- jmvcore::format(tabTitStr, dep=self$options$tipam)
            #table$setTitle(tabTit)
            
            table$setRow(rowNo=1, 
                        values=list(
                        r1=r1,
                        r2=r2,
                        Z=z,
                        P=p
                        ))
            table$addFootnote(rowNo=1, col=4, nota)
            
                }
        })
)
